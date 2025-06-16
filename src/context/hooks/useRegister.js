import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUpUser } from "../../api/userManagement";

export default function useRegister() {
  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Please check your email to verify your account.`);
    },
  });

  return { register, isRegistering };
}
