import { getConvexClient } from "src/lib/convex-client";
import { useEffect, useState } from "preact/hooks";
import type { VoteExtended } from "components/AdminSettings/VotingTool";

type GameClassification =
  | "MATERIALISTIC"
  | "TACTICAL"
  | "DYNAMIC"
  | "POSITIONAL"
  | "STRATEGIC"
  | "FORTUNE";

type GameplayClassification =
  | "FIRST_POSITIVE"
  | "FIRST_NEGATIVE"
  | "SECOND_POSITIVE"
  | "SECOND_NEGATIVE";

interface PostDetails {
  _id: string;
  postId: string;
  gameClassification: GameClassification | null;
  gameplayClassification: GameplayClassification | null;
  notes: string | null;
  votes: VoteExtended[];
}

export const useAdminSettingsConvex = (details: PostDetails) => {
  const [gameClassification, setGameClassification] = useState(
    details.gameClassification ?? undefined
  );
  const [gameplayClassification, setGameplayClassification] = useState(
    details.gameplayClassification ?? undefined
  );
  const [notes, setNotes] = useState<string>(details.notes ?? "");
  const [votes, setVotes] = useState<VoteExtended[]>(details.votes);

  const convex = getConvexClient();

  useEffect(() => {
    // Subscribe to post details for realtime updates
    const loadAndSubscribe = async () => {
      const api = (await import("../../../convex/_generated/api")).api;

      const unsubscribe = convex.onUpdate(
        api.postDetails.getByPostId,
        { postId: details.postId as any },
        (updated: PostDetails | null) => {
          if (updated) {
            setGameClassification(updated.gameClassification ?? undefined);
            setGameplayClassification(
              updated.gameplayClassification ?? undefined
            );
            setNotes(updated.notes ?? "");
            setVotes(updated.votes);
          }
        }
      );

      return unsubscribe;
    };

    let unsubscribe: (() => void) | undefined;
    loadAndSubscribe().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      unsubscribe?.();
    };
  }, [details.postId]);

  const onChangeGameClassification = async (e: Event) => {
    const target = e.target as HTMLSelectElement;
    let value: GameClassification | undefined =
      target.value as GameClassification;

    if (target.value === "Undefined") value = undefined;

    setGameClassification(value);

    const { api } = await import("../../../convex/_generated/api");
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      gameClassification: value ?? null,
    });
  };

  const setGameplayClassificationOnChange = async (
    value: GameplayClassification
  ) => {
    setGameplayClassification(value);

    const { api } = await import("../../../convex/_generated/api");
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      gameplayClassification: value,
    });
  };

  const onChangeNotes = async (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    const { api } = await import("../../../convex/_generated/api");
    await convex.mutation(api.postDetails.update, {
      postId: details.postId as any,
      notes: value,
    });
  };

  return {
    gameClassification,
    gameplayClassification,
    notes,
    votes,
    setVotes,
    onChangeGameClassification,
    setGameplayClassificationOnChange,
    onChangeNotes,
  };
};
