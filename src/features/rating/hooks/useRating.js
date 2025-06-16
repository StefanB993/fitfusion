import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addRating } from "../../../api/workoutManager";

export default function useRating() {
  const queryClient = useQueryClient();

  const { mutate: rateWorkout, isPending } = useMutation({
    mutationFn: addRating,
    onSuccess: () => {
      toast.success("Workout rated successfully!");
      queryClient.invalidateQueries({ queryKey: ["currentWorkout"] });
    },
    onError: (error) => {
      toast.error(`Error rating workout: ${error.message}`);
    },
  });

  return { rateWorkout, isPending };
}
