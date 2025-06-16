import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteWorkoutExercise as deleteWorkoutExerciseApi } from "../../../api/workoutManager";

export function useDeleteWorkoutExercise() {
  const queryClient = useQueryClient();
  const { mutate: deleteWorkoutExercise, isPending: isDeleting } = useMutation({
    mutationFn: deleteWorkoutExerciseApi,
    onSuccess: () => {
      toast.success("Exercise deleted successfully");
      queryClient.invalidateQueries("currentWorkout");
    },
    onError: () => {
      toast.error("Error deleting exercise");
    },
  });

  return { deleteWorkoutExercise, isDeleting };
}
