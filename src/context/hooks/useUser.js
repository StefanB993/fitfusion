import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/userManagement";

export default function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  return { user, isPending };
}
