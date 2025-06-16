import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteComment as deleteCommentApi } from "../../../api/workoutManager";

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      console.log("Comment deleted successfully");
      queryClient.invalidateQueries(["currentWorkout"]);
    },

    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error(error.message);
    },
  });

  return { deleteComment, isDeleting };
}
