import { Outlet } from "react-router-dom";
import useRedirectIfAuthenticated from "../../context/hooks/useRedirectIfAuthenticated";
import FullPageLoad from "../../components/FullPageLoad/FullPageLoad";

function ProtectedRoute() {
  const { user, isPending } = useRedirectIfAuthenticated();

  return isPending || !user ? <FullPageLoad /> : <Outlet />;
}

export default ProtectedRoute;
