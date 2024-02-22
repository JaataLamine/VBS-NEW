import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export const PrivateRouteAdmin = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isAdmin ? <Outlet /> : "";
};

export const PrivateRouteSuperAdmin = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.isSuperAdmin ? <Outlet /> : "";
};
