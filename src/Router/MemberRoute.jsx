import useAuthProvider from "./../hooks/useAuthProvider";
import { useLocation } from "react-router-dom";
import useRole from "./../hooks/useRole";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuthProvider();
  const location = useLocation();
  const [userRole, roleLoading] = useRole();
// console.log(user.displayName, roleLoading);
  if (loading || roleLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && userRole === "member") {
    return children;
  }
  // console.log(userRole);
  if(userRole === 'admin' || userRole==='trainer'){
    toast.info(`You are ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`)
    return <Navigate to="/"></Navigate>
  }
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default MemberRoute;
