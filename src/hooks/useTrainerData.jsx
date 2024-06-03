import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const axiosSecure = useAxiosSecure();
const useTrainerData = (trainerId) => {
  const {
    data: trainer = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trainers/${trainerId}`);
      return data;
    },
  });
  return [trainer, isLoading, error];
};

export default useTrainerData;
