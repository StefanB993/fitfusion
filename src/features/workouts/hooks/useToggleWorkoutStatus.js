import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleStatus as toggleStatusAPI } from "../../../api/workoutManager";
import toast from "react-hot-toast";

export function useToggleWorkoutStatus() {
  const queryClient = useQueryClient();
  const {
    mutate: toggleStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: toggleStatusAPI,
    onSuccess: () => {
      toast.success("Workout status updated successfully");
      queryClient.invalidateQueries(["currentWorkout"]);
    },
    onError: (error) => {
      toast.error("Error updating workout status: " + error.message);
    },
  });

  return { toggleStatus, isPending, error };
}
