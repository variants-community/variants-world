import { ConvexClient, ConvexHttpClient } from "convex/browser";

export { api } from "../../convex/_generated/api";

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

let convexClient: ConvexClient | null = null;
let convexHttpClient: ConvexHttpClient | null = null;

const CONVEX_SETUP_MESSAGE = `
PUBLIC_CONVEX_URL environment variable is not set.
Check out the CONTRIBUTING.md file for more details.
`;

/**
 * Get a singleton ConvexClient for client-side reactive subscriptions
 */
export function getConvexClient(): ConvexClient {
  if (!convexUrl) {
    throw new Error(CONVEX_SETUP_MESSAGE);
  }
  
  if (!convexClient) {
    convexClient = new ConvexClient(convexUrl);
  }
  
  return convexClient;
}

/**
 * Get a singleton ConvexHttpClient for server-side queries/mutations
 */
export function getConvexHttpClient(): ConvexHttpClient {
  if (!convexUrl) {
    throw new Error(CONVEX_SETUP_MESSAGE);
  }
  
  if (!convexHttpClient) {
    convexHttpClient = new ConvexHttpClient(convexUrl);
  }
  
  return convexHttpClient;
}

/**
 * Create a fresh ConvexClient (for SSR contexts)
 */
export function createConvexClient(): ConvexClient {
  if (!convexUrl) {
    throw new Error(CONVEX_SETUP_MESSAGE);
  }
  return new ConvexClient(convexUrl);
}

/**
 * Create a fresh ConvexHttpClient (for isolated server requests)
 */
export function createConvexHttpClient(): ConvexHttpClient {
  if (!convexUrl) {
    throw new Error(CONVEX_SETUP_MESSAGE);
  }
  return new ConvexHttpClient(convexUrl);
}
