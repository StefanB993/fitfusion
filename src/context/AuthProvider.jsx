import React, { useContext } from "react";
import useRegister from "./hooks/useRegister";
import useSignIn from "./hooks/useSignIn";
import useUser from "./hooks/useUser";
import { useSignOut } from "./hooks/useSignOut";
import { Outlet } from "react-router-dom";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useResetPassword } from "./hooks/useResetPassword";

const AuthContext = React.createContext();

export default function AuthProvider() {
  const { register, isRegistering } = useRegister();
  const { signIn, isSigningIn } = useSignIn();
  const { user, isPending } = useUser();
  const { signOut, isSigningOut } = useSignOut();
  const { update, isUpdating } = useUpdateUser();
  const { reset, isResetting } = useResetPassword();

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        register,
        isRegistering,
        signIn,
        isSigningIn,
        signOut,
        isSigningOut,
        update,
        isUpdating,
        reset,
        isResetting,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
