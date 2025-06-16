import { useQuery } from "@tanstack/react-query";
import { getOwnWorkouts } from "../../../api/workoutManager";
import formatDate from "../../../helpers";
import { useAuth } from "../../../context/AuthProvider";

export function useWorkouts() {
  const { user } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["ownWorkouts"],
    queryFn: () => getOwnWorkouts(user.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const formatedData = data?.map((workout) => {
    return {
      id: workout.id,
      name: workout.name,
      date: formatDate(workout.created_at),
      exercises: workout.workout_exercises[0].count,
      status: workout.status,
    };
  });

  return { workouts: formatedData, isPending };
}
