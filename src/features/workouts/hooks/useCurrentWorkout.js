import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../../api/workoutManager";
import { useParams } from "react-router-dom";

export function useCurrentWorkout() {
  const { id } = useParams();
  const {
    data: currentWorkout,
    isPending,
    error,
  } = useQuery({
    queryKey: ["currentWorkout", id],
    queryFn: () => getWorkout(id),
    retry: 1,
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const exercises = currentWorkout?.workout_exercises.map((exercise) => {
    return {
      id: exercise.id,
      bodyPart: exercise.exercises.bodyPart,
      name: exercise.exercises.name,
    };
  });

  return { currentWorkout, exercises, isPending, error };
}
