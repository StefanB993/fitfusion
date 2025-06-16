import toast from "react-hot-toast";
import { addComment as addCommentApi } from "../../../api/workoutManager";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useComment() {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending: isAdding } = useMutation({
    mutationFn: addCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentWorkout"]);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addComment, isAdding };
}
