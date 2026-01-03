// Convex type definitions matching the schema

export type UserRole = "TESTER" | "MEMBER";

export type VoteValue = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

export type GameplayClassification =
  | "FIRST_POSITIVE"
  | "FIRST_NEGATIVE"
  | "SECOND_POSITIVE"
  | "SECOND_NEGATIVE";

export type GameType = "NCV" | "WOF";

export type GameClassification =
  | "MATERIALISTIC"
  | "TACTICAL"
  | "DYNAMIC"
  | "POSITIONAL"
  | "STRATEGIC"
  | "FORTUNE";

export type GameStatus = "ACCEPTED" | "DECLINED" | "PENDING_REPLY" | "UNDER_REVIEW";

export interface UserForCard {
  _id: string;
  visibleId: number;
  username: string;
  role: UserRole;
  profileUrl?: string;
  lockedUntil?: number;
}

export interface PostForCard {
  _id: string;
  visibleId: number;
  status: GameStatus;
  type: GameType;
  variantLink: string;
  verdict: string;
  likes: { userId: string }[];
  title: string;
  authorId: string;
  gamerules: { _id: string; name: string }[];
  author: UserForCard | null;
  commentsCount: number;
  createdAt: number;
  updatedAt: number;
  description: string;
  fen: string;
}

export interface PostDetails {
  _id: string;
  postId: string;
  gameClassification: GameClassification | null;
  gameplayClassification: GameplayClassification | null;
  notes: string | null;
  votes: VoteExtended[];
}

export interface VoteExtended {
  _id: string;
  value: VoteValue;
  testerId: string;
  postDetailsId: string;
  tester: UserForCard | null;
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: number;
  postId: string;
  userId: string;
  parentId?: string;
  hidden: boolean;
  User: UserForCard | null;
  parent?: Comment | null;
}

export interface GameRule {
  _id: string;
  name: string;
}
