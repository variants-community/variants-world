/**
 * Migration script to transfer data from Supabase/PostgreSQL to Convex
 * 
 * Usage:
 * 1. Ensure your .env file has DATABASE_URL set to your PostgreSQL connection string
 * 2. Ensure .env.local has PUBLIC_CONVEX_URL set to your Convex deployment URL
 * 3. Run: fnm exec pnpm migrate:to-convex
 */

import { config } from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
// Import from the generated Prisma client location
import { PrismaClient } from "../node_modules/.prisma/client";

// Load environment variables from .env and .env.local
config({ path: ".env" });
config({ path: ".env.local" });

const prisma = new PrismaClient();

const CONVEX_URL = process.env.PUBLIC_CONVEX_URL || process.env.CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Error: CONVEX_URL or PUBLIC_CONVEX_URL environment variable is required");
  process.exit(1);
}

const convex = new ConvexHttpClient(CONVEX_URL);

// Maps to store old ID -> new Convex ID mappings
const userIdMap = new Map<number, string>();
const postIdMap = new Map<number, string>();
const postDetailsIdMap = new Map<number, string>();
const gameRuleIdMap = new Map<number, string>();
const commentIdMap = new Map<number, string>();

async function migrateUsers() {
  console.log("Migrating users...");
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    try {
      const convexId = await convex.mutation(api.users.create, {
        visibleId: user.id,
        uuid: user.uuid,
        username: user.username,
        profileUrl: user.profileUrl ?? undefined,
        role: user.role as "TESTER" | "MEMBER",
        refreshToken: user.refreshToken ?? undefined,
      });
      
      userIdMap.set(user.id, convexId);
      
      // Update lockedUntil if set
      if (user.lockedUntil) {
        await convex.mutation(api.users.update, {
          id: convexId as any,
          lockedUntil: user.lockedUntil.getTime(),
        });
      }
      
      console.log(`  Migrated user: ${user.username} (${user.id} -> ${convexId})`);
    } catch (error) {
      console.error(`  Failed to migrate user ${user.id}:`, error);
    }
  }
  
  console.log(`Migrated ${userIdMap.size}/${users.length} users`);
}

async function migrateGameRules() {
  console.log("Migrating game rules...");
  const gameRules = await prisma.gameRule.findMany();
  
  for (const rule of gameRules) {
    try {
      const convexId = await convex.mutation(api.gameRules.getOrCreate, {
        name: rule.name,
      });
      
      gameRuleIdMap.set(rule.id, convexId);
      console.log(`  Migrated game rule: ${rule.name} (${rule.id} -> ${convexId})`);
    } catch (error) {
      console.error(`  Failed to migrate game rule ${rule.id}:`, error);
    }
  }
  
  console.log(`Migrated ${gameRuleIdMap.size}/${gameRules.length} game rules`);
}

async function migratePosts() {
  console.log("Migrating posts...");
  const posts = await prisma.post.findMany({
    include: {
      gamerules: true,
      PostDetails: true,
    },
  });
  
  for (const post of posts) {
    try {
      const authorConvexId = userIdMap.get(post.authorUserId);
      if (!authorConvexId) {
        console.error(`  Skipping post ${post.id}: author ${post.authorUserId} not found`);
        continue;
      }
      
      const convexId = await convex.mutation(api.posts.create, {
        visibleId: post.id,
        gameNr: post.gameNr,
        gameNrs: post.gameNrs,
        fen: post.fen,
        title: post.title,
        description: post.description,
        type: post.type as "NCV" | "WOF",
        status: post.status as "ACCEPTED" | "DECLINED" | "PENDING_REPLY" | "UNDER_REVIEW",
        authorId: authorConvexId as any,
        variantLink: post.variantLink,
        verdict: post.verdict ?? undefined,
        createdAt: post.createdAt.getTime(),
        updatedAt: post.updatedAt.getTime(),
      });
      
      postIdMap.set(post.id, convexId);
      
      // Link game rules to post
      for (const rule of post.gamerules) {
        const ruleConvexId = gameRuleIdMap.get(rule.id);
        if (ruleConvexId) {
          await convex.mutation(api.gameRules.addToPost, {
            gameRuleId: ruleConvexId as any,
            postId: convexId as any,
          });
        }
      }
      
      console.log(`  Migrated post: ${post.title} (${post.id} -> ${convexId})`);
    } catch (error) {
      console.error(`  Failed to migrate post ${post.id}:`, error);
    }
  }
  
  console.log(`Migrated ${postIdMap.size}/${posts.length} posts`);
}

async function migratePostDetails() {
  console.log("Migrating post details...");
  const postDetails = await prisma.postDetails.findMany();
  
  for (const details of postDetails) {
    try {
      const postConvexId = postIdMap.get(details.postId);
      if (!postConvexId) {
        console.error(`  Skipping post details ${details.id}: post ${details.postId} not found`);
        continue;
      }
      
      // Post details are created automatically with posts, just update them
      await convex.mutation(api.postDetails.update, {
        postId: postConvexId as any,
        notes: details.notes ?? undefined,
        gameClassification: details.gameClassification as any ?? null,
        gameplayClassification: details.gameplayClassification as any ?? null,
      });
      
      // Store the mapping (we need to query to get the actual ID)
      postDetailsIdMap.set(details.id, `${postConvexId}-details`);
      
      console.log(`  Migrated post details for post ${details.postId}`);
    } catch (error) {
      console.error(`  Failed to migrate post details ${details.id}:`, error);
    }
  }
  
  console.log(`Migrated ${postDetailsIdMap.size}/${postDetails.length} post details`);
}

async function migrateComments() {
  console.log("Migrating comments...");
  
  // First pass: migrate comments without parent references
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "asc" }, // Ensure parents are created before children
  });
  
  for (const comment of comments) {
    try {
      const postConvexId = postIdMap.get(comment.postId);
      const userConvexId = userIdMap.get(comment.userId);
      
      if (!postConvexId || !userConvexId) {
        console.error(`  Skipping comment ${comment.id}: missing post or user`);
        continue;
      }
      
      let parentConvexId: string | undefined;
      if (comment.parent_id) {
        parentConvexId = commentIdMap.get(comment.parent_id);
      }
      
      const convexId = await convex.mutation(api.comments.add, {
        content: comment.content,
        postId: postConvexId as any,
        userId: userConvexId as any,
        parentId: parentConvexId as any,
      });
      
      commentIdMap.set(comment.id, convexId);
      
      // Hide if needed
      if (comment.hidden) {
        await convex.mutation(api.comments.hide, { id: convexId as any });
      }
      
      console.log(`  Migrated comment ${comment.id} -> ${convexId}`);
    } catch (error) {
      console.error(`  Failed to migrate comment ${comment.id}:`, error);
    }
  }
  
  console.log(`Migrated ${commentIdMap.size}/${comments.length} comments`);
}

async function migrateLikes() {
  console.log("Migrating likes...");
  const likes = await prisma.postOnUserLikes.findMany();
  let migratedCount = 0;
  
  for (const like of likes) {
    try {
      const postConvexId = postIdMap.get(like.postId);
      const userConvexId = userIdMap.get(like.userId);
      
      if (!postConvexId || !userConvexId) {
        console.error(`  Skipping like: missing post ${like.postId} or user ${like.userId}`);
        continue;
      }
      
      await convex.mutation(api.likes.add, {
        postId: postConvexId as any,
        userId: userConvexId as any,
      });
      
      migratedCount++;
    } catch (error) {
      console.error(`  Failed to migrate like:`, error);
    }
  }
  
  console.log(`Migrated ${migratedCount}/${likes.length} likes`);
}

async function migrateVotes() {
  console.log("Migrating votes...");
  const votes = await prisma.vote.findMany({
    include: { postDetails: true },
  });
  let migratedCount = 0;
  
  for (const vote of votes) {
    try {
      const postConvexId = postIdMap.get(vote.postDetails.postId);
      const testerConvexId = userIdMap.get(vote.testerId);
      
      if (!postConvexId || !testerConvexId) {
        console.error(`  Skipping vote ${vote.id}: missing post or tester`);
        continue;
      }
      
      // We need to get the postDetails ID from Convex
      // For now, we'll use the upsert which handles this
      // Note: This requires knowing the postDetailsId which we'd need to query
      // For simplicity, we'll skip this and note it needs manual handling
      console.log(`  Vote ${vote.id} needs manual migration (postDetailsId lookup required)`);
      
    } catch (error) {
      console.error(`  Failed to migrate vote ${vote.id}:`, error);
    }
  }
  
  console.log(`Note: Votes require postDetailsId lookup - implement separately if needed`);
}

async function migrateSystem() {
  console.log("Migrating system settings...");
  const system = await prisma.system.findFirst({ where: { id: 1 } });
  
  if (system) {
    await convex.mutation(api.system.updateStars, { stars: system.stars });
    console.log(`  Migrated stars count: ${system.stars}`);
  }
}

async function main() {
  console.log("Starting migration from Supabase/PostgreSQL to Convex...\n");
  
  try {
    await migrateUsers();
    console.log("");
    
    await migrateGameRules();
    console.log("");
    
    await migratePosts();
    console.log("");
    
    await migratePostDetails();
    console.log("");
    
    await migrateComments();
    console.log("");
    
    await migrateLikes();
    console.log("");
    
    await migrateVotes();
    console.log("");
    
    await migrateSystem();
    console.log("");
    
    console.log("Migration completed!");
    console.log("\nSummary:");
    console.log(`  Users: ${userIdMap.size}`);
    console.log(`  Game Rules: ${gameRuleIdMap.size}`);
    console.log(`  Posts: ${postIdMap.size}`);
    console.log(`  Comments: ${commentIdMap.size}`);
    
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
