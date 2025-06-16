import { useMutation } from "@tanstack/react-query";
import { recoverPassword } from "../../api/userManagement";
import toast from "react-hot-toast";

export function useRecoverPassword() {
  const { mutate: recoverPass, isPending: isRecovering } = useMutation({
    mutationFn: recoverPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Password recovery email sent");
    },
  });

  return { recoverPass, isRecovering };
}
