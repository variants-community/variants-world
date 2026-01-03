import { getConvexClient } from "src/lib/convex-client";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { ExtendedComment } from ".";

export const useCommentsConvex = (
  initComments: ExtendedComment[],
  postId: string // Convex ID as string
) => {
  const comments = useSignal<ExtendedComment[]>(initComments);
  const convex = getConvexClient();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupSubscription = async () => {
      const { api } = await import("../../../convex/_generated/api");
      // Subscribe to comments query for realtime updates
      unsubscribe = convex.onUpdate(
        api.comments.getByPost,
        { postId: postId as any },
        (updatedComments: ExtendedComment[]) => {
          if (updatedComments) {
            comments.value = updatedComments
              .sort((first, second) =>
                first.createdAt > second.createdAt
                  ? -1
                  : first.createdAt < second.createdAt
                    ? 1
                    : 0
              )
              .filter((c) => !c.hidden);
          }
        }
      );
    };

    setupSubscription();

    return () => {
      unsubscribe?.();
    };
  }, [postId]);

  return {
    comments: comments.value,
  };
};
