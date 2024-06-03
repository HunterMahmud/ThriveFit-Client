import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "./../../../hooks/useAuthProvider";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const DashboardAllTrainers = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["trainers", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/trainers");
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

  const handleDelete = async (trainerId, email) => {
    // deleteTrainerMutation.mutate(trainerId);
    // console.log(trainerId);
    try {
      const { data } = await axiosSecure.delete(`/trainers/${trainerId}`);
      // console.log(data);
      if (data.deletedCount > 0) {
        const { data: roleUpdate } = await axiosSecure.patch(`/user/${email}`, {
          role: "member",
        });
        // console.log(roleUpdate);
        if (roleUpdate.modifiedCount > 0) {
          toast.success("Trainer removed!");
          refetch();
        }
      }
    } catch (err) {}
  };

  return (
    <div className="w-full mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        All Trainers
      </h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-800 bg-white ">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Profile Image</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="bg-gray-100">
                <td className="border px-4 py-2 flex justify-center items-center">
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">{trainer.fullName}</td>
                <td className="border px-4 py-2">{trainer.email}</td>
                <td className="border px-4 py-2">{trainer.age}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(trainer._id, trainer.email)}
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
