

import { useQuery } from '@tanstack/react-query';
import useAuthProvider from './useAuthProvider';
import useAxiosPublic from './useAxiosPublic';
const useAllTrainersData = (status) => {
  const axiosPublic = useAxiosPublic();
    // console.log(status);
    const {user} = useAuthProvider()
    const { data: trainers = [], refetch, isLoading } = useQuery({
      queryKey: ["trainers", user?.email],
      queryFn: async () => {
        const { data } = await axiosPublic.get(`/trainers?status=${status}`);
        return data;
      },
    });
    return [trainers, refetch, isLoading];
};

export default useAllTrainersData;