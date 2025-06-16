import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const protectedRoutes = ["/confirm-email", "/password-reset", "/dashboard"];

export default function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const { user, isPending } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isWelcomePage = pathname.includes("/welcome");
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route)
  );

  useEffect(() => {
    if (isPending) return;
    if (!user && isProtectedRoute) {
      navigate("/welcome/login");
      return;
    }

    if (user && isWelcomePage) {
      navigate(redirectTo);
      return;
    }
  }, [
    user,
    isPending,
    navigate,
    redirectTo,
    pathname,
    isProtectedRoute,
    isWelcomePage,
  ]);

  return { user, isPending };
}
