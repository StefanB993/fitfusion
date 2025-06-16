import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/userManagement";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User updated successfully.");
    },
  });

  return { update, isUpdating };
}
