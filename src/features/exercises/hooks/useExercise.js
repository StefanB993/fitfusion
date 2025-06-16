import { useQuery } from "@tanstack/react-query";
import { getExercise } from "../../../api/exerciseManager";
import { useParams } from "react-router-dom";

export function useExercise() {
  const { exerciseId } = useParams();
  const isEnabled = !!exerciseId;
  const { data: exercise, isPending } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => getExercise(exerciseId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isEnabled,
  });

  return { exercise, isPending: isEnabled ? isPending : false };
}
