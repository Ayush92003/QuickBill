import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
