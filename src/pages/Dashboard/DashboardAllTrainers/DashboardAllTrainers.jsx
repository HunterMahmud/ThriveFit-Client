import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthProvider from './../../../hooks/useAuthProvider';
import useAxiosSecure from './../../../hooks/useAxiosSecure';


const DashboardAllTrainers = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: trainers = [] } = useQuery({
    queryKey: ['trainers', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure('/trainers');
      return data;
    },
  });

//   const deleteTrainerMutation = useMutation({
//     mutationFn: async (trainerId) => {
//       await axiosSecure.patch(`/trainers/${trainerId}/role`, { role: 'Member' });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries('trainers');
//     },
//   });

  const handleDelete = (trainerId) => {
    // deleteTrainerMutation.mutate(trainerId);
    console.log(trainerId);
  };

  return (
    <div className="w-full mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">All Trainers</h1>
      <div className='w-full overflow-x-auto'>
      <table className="w-full text-gray-800 bg-white ">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Profile Image</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Years of Experience</th>
            <th className="px-4 py-2">Skills</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer._id} className="bg-gray-100">
              <td className="border px-4 py-2">
                <img src={trainer.profileImage} alt={trainer.fullName} className="w-16 h-16 rounded-full" />
              </td>
              <td className="border px-4 py-2">{trainer.fullName}</td>
              <td className="border px-4 py-2">{trainer.email}</td>
              <td className="border px-4 py-2">{trainer.age}</td>
              <td className="border px-4 py-2">{trainer.yearsOfExperience}</td>
              <td className="border px-4 py-2">
                {trainer.skills.map((skill) => skill.label).join(', ')}
              </td>
             
              <td className="border px-4 py-2">{trainer.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(trainer._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DashboardAllTrainers;
