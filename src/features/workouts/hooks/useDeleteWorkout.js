import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout as deleteWorkoutApi } from "../../../api/workoutManager";
import toast from "react-hot-toast";

export function useDeleteWorkout() {
  const queryClient = useQueryClient();
  const { mutate: deleteWorkout, isPending: isDeleting } = useMutation({
    mutationFn: deleteWorkoutApi,
    onSuccess: () => {
      toast.success("Workout deleted successfully");
      queryClient.invalidateQueries("workouts");
    },
    onError: () => {
      toast.error("Error deleting workout");
    },
  });

  return { deleteWorkout, isDeleting };
}
