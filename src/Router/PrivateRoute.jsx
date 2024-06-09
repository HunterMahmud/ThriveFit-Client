import { Navigate, useLocation } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
  // console.log(user?.displayName, loading);
  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
