import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/lib/auth.tsx";

const PrivateRoute = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
