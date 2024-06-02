import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import TrainerCard from '../../components/AllTrainer/TrainerCard';

const AllTrainers = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/trainers');
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Trainers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
