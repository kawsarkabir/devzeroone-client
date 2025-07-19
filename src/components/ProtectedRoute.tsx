import { Navigate, useLocation } from "react-router";
import LoadingSpiner from "./LoadingSpiner";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  // ⛔️ Wait until loading is done
  if (isLoading) return <LoadingSpiner />;

  // ❌ Redirect only after we are sure it's not loading
  if (!isAuthenticated) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
