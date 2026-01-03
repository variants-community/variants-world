/**
 * Fix post dates - updates createdAt and updatedAt from Supabase data
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

async function fixPostDates() {
  console.log("Fixing post dates...");
  
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  
  let fixedCount = 0;
  let skippedCount = 0;
  
  for (const post of posts) {
    try {
      // Find the post in Convex by visibleId
      const convexPost = await convex.query(api.posts.getByVisibleId, { 
        visibleId: post.id 
      });
      
      if (!convexPost) {
        console.error(`  Post ${post.id} not found in Convex`);
        skippedCount++;
        continue;
      }
      
      // Update the dates
      await convex.mutation(api.posts.update, {
        id: convexPost._id as any,
        createdAt: post.createdAt.getTime(),
        updatedAt: post.updatedAt.getTime(),
      });
      
      fixedCount++;
      if (fixedCount % 100 === 0) {
        console.log(`  Fixed ${fixedCount} posts...`);
      }
    } catch (error) {
      console.error(`  Failed to fix post ${post.id}:`, error);
      skippedCount++;
    }
  }
  
  console.log(`\nFixed ${fixedCount}/${posts.length} posts (${skippedCount} skipped)`);
}

async function main() {
  console.log("Starting post date fix...\n");
  
  try {
    await fixPostDates();
    console.log("\nPost date fix completed!");
  } catch (error) {
    console.error("Fix failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
