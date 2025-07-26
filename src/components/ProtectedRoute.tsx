import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoadingSpiner from "./LoadingSpiner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "teacher" | "student";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const location = useLocation();

  // Show loading spinner while auth state is checking
  if (isLoading) return <LoadingSpiner />;

  // If not logged in, redirect to login with the current path preserved
  if (!isAuthenticated) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  // If role mismatch, block access
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
