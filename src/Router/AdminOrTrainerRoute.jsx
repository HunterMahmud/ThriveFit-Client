import useAuthProvider from "./../hooks/useAuthProvider";
import { useLocation } from "react-router-dom";
import useRole from "./../hooks/useRole";
import { Navigate } from "react-router-dom";

const AdminOrTrainerRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
  const [userRole, roleLoading] = useRole();

  if (loading || roleLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && (userRole === "admin" || userRole ==='trainer')) {
    return children;
  }
  else if(user){
    return <Navigate to="/" replace={true}/>
  }
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default AdminOrTrainerRoute;