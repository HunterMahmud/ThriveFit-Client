
import { useQuery } from '@tanstack/react-query';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuthProvider();
    const {data: userRole, isLoading:roleLoading} = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
            const {data} = await axiosSecure(`/user/role/${user?.email}`);
            return data;
        }
    })
    return [userRole,roleLoading ];
}

export default useRole;