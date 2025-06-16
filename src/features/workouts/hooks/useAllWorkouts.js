import { useQuery } from "@tanstack/react-query";
import { getAllWorkouts } from "../../../api/workoutManager";
import { useSearchParams } from "react-router-dom";

export function useAllWorkouts() {
  const [searchParams] = useSearchParams();

  const params = {
    sort: searchParams.get("Sort") || "newest",
    page: +searchParams.get("Page") || 1,
  };
  const {
    data: { workouts, count } = {},
    isPending,
    isError,
  } = useQuery({
    queryKey: ["allWorkouts", params],
    queryFn: getAllWorkouts,
    refetchOnWindowFocus: false,
  });

  return { workouts, isPending, isError, count };
}
