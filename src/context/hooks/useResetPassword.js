import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/userManagement";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { mutate: reset, isPending: isResetting } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Password reset successfully.");
    },
  });

  return { reset, isResetting };
}
