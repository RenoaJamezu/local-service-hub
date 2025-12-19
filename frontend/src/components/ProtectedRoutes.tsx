import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { token } = useAuth();

  // if user is not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  };

  return <Outlet />;
}