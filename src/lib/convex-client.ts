import { ConvexClient } from "convex/browser";

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

let convexClient: ConvexClient | null = null;

export function getConvexClient(): ConvexClient {
  if (!convexUrl) {
    throw new Error("PUBLIC_CONVEX_URL environment variable is not set");
  }
  
  if (!convexClient) {
    convexClient = new ConvexClient(convexUrl);
  }
  
  return convexClient;
}

// For SSR contexts where we need a fresh client
export function createConvexClient(): ConvexClient {
  if (!convexUrl) {
    throw new Error("PUBLIC_CONVEX_URL environment variable is not set");
  }
  return new ConvexClient(convexUrl);
}
