import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser } from "../../api/userManagement";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: signInUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: ({ user }) => {
      toast.success(`Welcome back, ${user.user_metadata.name}!`);
      queryClient.setQueryData(["user"], user);
      navigate("dashboard");
    },
  });

  return { signIn, isSigningIn };
}
