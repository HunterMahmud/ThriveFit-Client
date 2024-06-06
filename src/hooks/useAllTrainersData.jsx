
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuthProvider from './useAuthProvider';
//todo: have to use axios public
const useAllTrainersData = (status) => {
  const axiosSecure = useAxiosSecure();
    // console.log(status);
    const {user} = useAuthProvider()
    const { data: trainers = [], refetch, isLoading } = useQuery({
      queryKey: ["trainers", user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/trainers?status=${status}`);
        return data;
      },
    });
    return [trainers, refetch, isLoading];
};

export default useAllTrainersData;