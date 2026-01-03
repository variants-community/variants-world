import { ConvexHttpClient } from "convex/browser";

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

export const createUser = async (params: {
  visibleId: number;
  uuid: string;
  username: string;
  profileUrl?: string;
  role?: "TESTER" | "MEMBER";
  refreshToken?: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.users.create, params);
};

export const updateUser = async (params: {
  id: string;
  username?: string;
  profileUrl?: string;
  role?: "TESTER" | "MEMBER";
  refreshToken?: string;
  lockedUntil?: number;
  uuid?: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.users.update, { ...params, id: params.id as any });
};

export const createPost = async (params: {
  visibleId: number;
  gameNr: number;
  gameNrs: number[];
  fen: string;
  title: string;
  description: string;
  type: "NCV" | "WOF";
  status: "ACCEPTED" | "DECLINED" | "PENDING_REPLY" | "UNDER_REVIEW";
  authorId: string;
  variantLink: string;
  verdict?: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.posts.create, { ...params, authorId: params.authorId as any });
};

export const updatePost = async (params: {
  id: string;
  title?: string;
  description?: string;
  type?: "NCV" | "WOF";
  status?: "ACCEPTED" | "DECLINED" | "PENDING_REPLY" | "UNDER_REVIEW";
  verdict?: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.posts.update, { ...params, id: params.id as any });
};

export const addComment = async (params: {
  content: string;
  postId: string;
  userId: string;
  parentId?: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.comments.add, {
    content: params.content,
    postId: params.postId as any,
    userId: params.userId as any,
    parentId: params.parentId as any,
  });
};

export const addLike = async (postId: string, userId: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.likes.add, {
    postId: postId as any,
    userId: userId as any,
  });
};

export const removeLike = async (postId: string, userId: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.likes.remove, {
    postId: postId as any,
    userId: userId as any,
  });
};

export const updateStars = async (stars: number) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.system.updateStars, { stars });
};

export const getOrCreateGameRule = async (name: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.gameRules.getOrCreate, { name });
};

export const addGameRuleToPost = async (gameRuleId: string, postId: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.gameRules.addToPost, {
    gameRuleId: gameRuleId as any,
    postId: postId as any,
  });
};

export const updatePostDetails = async (params: {
  postId: string;
  notes?: string;
  gameClassification?: "MATERIALISTIC" | "TACTICAL" | "DYNAMIC" | "POSITIONAL" | "STRATEGIC" | "FORTUNE" | null;
  gameplayClassification?: "FIRST_POSITIVE" | "FIRST_NEGATIVE" | "SECOND_POSITIVE" | "SECOND_NEGATIVE" | null;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.postDetails.update, {
    ...params,
    postId: params.postId as any,
  });
};

export const upsertVote = async (params: {
  value: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  testerId: string;
  postDetailsId: string;
}) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.votes.upsert, {
    value: params.value,
    testerId: params.testerId as any,
    postDetailsId: params.postDetailsId as any,
  });
};

export const removeVote = async (testerId: string, postDetailsId: string) => {
  const client = getHttpClient();
  const { api } = await import("../../../convex/_generated/api");
  return await client.mutation(api.votes.remove, {
    testerId: testerId as any,
    postDetailsId: postDetailsId as any,
  });
};
