
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuthProvider from './useAuthProvider';

const axiosSecure = useAxiosSecure();
const useAllTrainersData = (status) => {
    // console.log(status);
    const {user} = useAuthProvider()
    const { data: trainers = [], refetch } = useQuery({
      queryKey: ["trainers", user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/trainers?status=${status}`);
        return data;
      },
    });
    return [trainers, refetch];
};

export default useAllTrainersData;