import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExerciseSet } from "../../../api/exerciseManager";
import toast from "react-hot-toast";

export default function useUpdateExerciseSets() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: updateExerciseSet,
    onSuccess: () => {
      toast.success("Exercise set updated successfully");
      queryClient.invalidateQueries(["exercise"]);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      });
    },
  });

  return { update, isPending };
}
