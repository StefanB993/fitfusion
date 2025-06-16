import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getExercises } from "../../../api/exerciseManager";
import { EXERCISES_PER_PAGE } from "../../../config";

export function useExercises() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const params = {
    equipment: searchParams.get("Equipment") || "any",
    muscle: searchParams.get("Muscle") || "any",
    query: searchParams.get("Query") || "",
    page: +searchParams.get("Page") || 1,
  };

  const queryOptions = {
    queryFn: getExercises,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };

  const {
    data: { exercises, count } = {},
    error,
    isPending,
  } = useQuery({
    queryKey: ["exercises", params],
    ...queryOptions,
  });

  const pageCount = Math.ceil(count / EXERCISES_PER_PAGE);

  if (params.page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["exercises", { ...params, page: params.page + 1 }],
      ...queryOptions,
    });
  }

  if (params.page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["exercises", { ...params, page: params.page - 1 }],
      ...queryOptions,
    });
  }

  return { exercises, error, isPending, count };
}
