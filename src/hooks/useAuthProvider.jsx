import { AuthContext } from '../AuthProvider/AuthProvider';
import { useContext } from 'react';



const useAuthProvider = () => {
    const info = useContext(AuthContext);
    return info;
};

export default useAuthProvider;