import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignOut } from "../../api/userManagement";
import toast from "react-hot-toast";

export function useSignOut() {
  const queryClient = useQueryClient();
  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: userSignOut,
    onError: (error) => console.log(error),
    onSuccess: () => {
      // queryClient.removeQueries();
      queryClient.invalidateQueries(["user"]);
      toast.success("Signed out successfully");
    },
  });

  return { signOut, isSigningOut };
}
