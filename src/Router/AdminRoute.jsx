
import useAuthProvider from './../hooks/useAuthProvider';
import { useLocation } from 'react-router-dom';

const AdminRoute = () => {
    const {user, loading} = useAuthProvider();
    const location = useLocation();

    if(loading) {return <div className="w-full min-h-[calc(100vh-349px)] flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;}
    if(user)  {
       return children;
    } 
    return <Navigate to='/login' state={location.pathname} replace={true}/>
};

export default AdminRoute;