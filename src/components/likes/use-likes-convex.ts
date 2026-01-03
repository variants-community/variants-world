import { getConvexClient } from "src/lib/convex-client";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

export const useLikesConvex = (
  likes: { visibleId: number }[],
  visibleUserId: number,
  postId: string, // Convex ID as string
  userId: string // Convex ID as string
) => {
  const isLiked = useSignal(likes.some((like) => like.visibleId === visibleUserId));
  const likesCount = useSignal(likes.length);
  const convex = getConvexClient();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupSubscription = async () => {
      const { api } = await import("../../../convex/_generated/api");
      // Subscribe to likes count for realtime updates
      unsubscribe = convex.onUpdate(
        api.likes.getCount,
        { postId: postId as any },
        (count: number) => {
          if (typeof count === "number") {
            likesCount.value = count;
          }
        }
      );
    };

    setupSubscription();

    return () => {
      unsubscribe?.();
    };
  }, [postId]);

  const toggleLike = async () => {
    // Optimistic update
    likesCount.value = isLiked.value ? likesCount.value - 1 : likesCount.value + 1;
    isLiked.value = !isLiked.value;

    try {
      const { api } = await import("../../../convex/_generated/api");
      if (!isLiked.value) {
        await convex.mutation(api.likes.remove, { postId: postId as any, userId: userId as any });
        isLiked.value = false;
      } else {
        await convex.mutation(api.likes.add, { postId: postId as any, userId: userId as any });
        isLiked.value = true;
      }
    } catch (error) {
      // Revert on error
      isLiked.value = !isLiked.value;
      likesCount.value = isLiked.value ? likesCount.value + 1 : likesCount.value - 1;
      console.error("Failed to toggle like:", error);
    }
  };

  return {
    isLiked: isLiked.value,
    likesCount: likesCount.value,
    toggleLike,
  };
};
