import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const axiosSecure = useAxiosSecure();
const useTrainerData = (trainerInfo) => {
  let trainerQuery = '';
  if(trainerInfo?.id){
    trainerQuery = trainerInfo.id;
  }
  else if(trainerInfo?.email){
    trainerQuery = trainerInfo.email;
  }
  const {
    data: trainer = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer", trainerQuery],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trainers/${trainerQuery}`);
      return data;
    },
  });
  return [trainer, isLoading, error];
};

export default useTrainerData;
