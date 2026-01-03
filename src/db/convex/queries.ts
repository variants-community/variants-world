import { ConvexHttpClient } from "convex/browser";
import { edgeCache } from "utils/cache";

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

let httpClient: ConvexHttpClient | null = null;

function getHttpClient(): ConvexHttpClient {
  if (!convexUrl) {
    throw new Error("PUBLIC_CONVEX_URL environment variable is not set");
  }
  if (!httpClient) {
    httpClient = new ConvexHttpClient(convexUrl);
  }
  return httpClient;
}

export const getStars = async (): Promise<number> => {
  const cached = edgeCache.get<number>("stars");
  if (cached !== undefined) return cached;
  console.log("Fetching stars...");
  
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  const stars = await client.query(api.system.getStars, {});
  edgeCache.set("stars", stars, ["stars"]);
  return stars;
};

export const getPostById = async (postVisibleId: number) => {
  const cached = edgeCache.get<Awaited<ReturnType<typeof getPostById>>>(postVisibleId) as never;
  if (cached) return cached;

  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  const post = await client.query(api.posts.getByVisibleId, { visibleId: postVisibleId });
  
  edgeCache.set(postVisibleId, post, [`post-${postVisibleId}`]);
  return post;
};

export const getPostDetailsById = async (postId: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.query(api.postDetails.getByPostId, { postId: postId as any });
};

export const getFilteredPosts = async (params: {
  page: number;
  size: number;
  search: string;
  status?: "UNDER_REVIEW" | "ACCEPTED" | "DECLINED" | "PENDING_REPLY";
  postVisibleId?: number;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.query(api.posts.getFiltered, params);
};

export const getTotalPostsCount = async (): Promise<number> => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.query(api.posts.getTotalCount, {});
};

export const getUserByVisibleId = async (visibleId: number) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.query(api.users.getByVisibleId, { visibleId });
};

export const getLockedUsers = async () => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.query(api.users.getLockedUsers, {});
};
