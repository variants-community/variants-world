/**
 * Migration script to transfer votes from Supabase/PostgreSQL to Convex
 * Run after the main migration script
 */

import { config } from "dotenv";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { PrismaClient } from "../node_modules/.prisma/client";

config({ path: ".env" });
config({ path: ".env.local" });

const prisma = new PrismaClient();

const CONVEX_URL = process.env.PUBLIC_CONVEX_URL || process.env.CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Error: CONVEX_URL or PUBLIC_CONVEX_URL environment variable is required");
  process.exit(1);
}

const convex = new ConvexHttpClient(CONVEX_URL);

async function migrateVotes() {
  console.log("Migrating votes...");
  
  const votes = await prisma.vote.findMany({
    include: { 
      postDetails: true,
      tester: true,
    },
  });
  
  let migratedCount = 0;
  let skippedCount = 0;
  
  for (const vote of votes) {
    try {
      // Get the post's visibleId from postDetails
      const postVisibleId = vote.postDetails.postId;
      
      // Find the post in Convex by visibleId
      const convexPost = await convex.query(api.posts.getByVisibleId, { 
        visibleId: postVisibleId 
      });
      
      if (!convexPost) {
        console.error(`  Skipping vote ${vote.id}: post ${postVisibleId} not found in Convex`);
        skippedCount++;
        continue;
      }
      
      // Find the user in Convex by visibleId
      const convexUser = await convex.query(api.users.getByVisibleId, { 
        visibleId: vote.testerId 
      });
      
      if (!convexUser) {
        console.error(`  Skipping vote ${vote.id}: tester ${vote.testerId} not found in Convex`);
        skippedCount++;
        continue;
      }
      
      // Get postDetails from Convex
      const convexPostDetails = await convex.query(api.postDetails.getByPostId, {
        postId: convexPost._id,
      });
      
      if (!convexPostDetails) {
        console.error(`  Skipping vote ${vote.id}: postDetails not found for post ${postVisibleId}`);
        skippedCount++;
        continue;
      }
      
      // Upsert the vote
      await convex.mutation(api.votes.upsert, {
        value: vote.value as "POSITIVE" | "NEGATIVE" | "NEUTRAL",
        testerId: convexUser._id as any,
        postDetailsId: convexPostDetails._id as any,
      });
      
      migratedCount++;
      console.log(`  Migrated vote ${vote.id} (tester: ${vote.tester.username}, post: ${postVisibleId})`);
    } catch (error) {
      console.error(`  Failed to migrate vote ${vote.id}:`, error);
      skippedCount++;
    }
  }
  
  console.log(`\nMigrated ${migratedCount}/${votes.length} votes (${skippedCount} skipped)`);
}

async function main() {
  console.log("Starting votes migration...\n");
  
  try {
    await migrateVotes();
    console.log("\nVotes migration completed!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
