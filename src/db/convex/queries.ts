import { getConvexHttpClient, api } from "src/lib/convex-client";
import { edgeCache } from "utils/cache";

export const getStars = async (): Promise<number> => {
  const cached = edgeCache.get<number>("stars");
  if (cached !== undefined) return cached;
  console.log("Fetching stars...");
  
  const client = getConvexHttpClient();
  const stars = await client.query(api.system.getStars, {});
  edgeCache.set("stars", stars, ["stars"]);
  return stars;
};

export const getPostById = async (postVisibleId: number) => {
  const cached = edgeCache.get<Awaited<ReturnType<typeof getPostById>>>(postVisibleId) as never;
  if (cached) return cached;

  const client = getConvexHttpClient();
  const post = await client.query(api.posts.getByVisibleId, { visibleId: postVisibleId });
  
  edgeCache.set(postVisibleId, post, [`post-${postVisibleId}`]);
  return post;
};

export const getPostDetailsById = async (postId: string) => {
  const client = getConvexHttpClient();
  return await client.query(api.postDetails.getByPostId, { postId: postId as any });
};

export const getFilteredPosts = async (params: {
  page: number;
  size: number;
  search: string;
  status?: "UNDER_REVIEW" | "ACCEPTED" | "DECLINED" | "PENDING_REPLY";
  postVisibleId?: number;
}) => {
  const client = getConvexHttpClient();
  return await client.query(api.posts.getFiltered, params);
};

export const getTotalPostsCount = async (): Promise<number> => {
  const client = getConvexHttpClient();
  return await client.query(api.posts.getTotalCount, {});
};

export const getUserByVisibleId = async (visibleId: number) => {
  const client = getConvexHttpClient();
  return await client.query(api.users.getByVisibleId, { visibleId });
};

export const getLockedUsers = async () => {
  const client = getConvexHttpClient();
  return await client.query(api.users.getLockedUsers, {});
};
