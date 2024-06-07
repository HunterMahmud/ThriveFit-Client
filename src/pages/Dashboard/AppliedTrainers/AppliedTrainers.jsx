import React, { useState } from "react";
import useAllTrainersData from "./../../../hooks/useAllTrainersData";
import ManageModal from "./ManageModal";
import { FaEye } from "react-icons/fa";

const AppliedTrainers = () => {
  const [trainers, refetch, isLoading] = useAllTrainersData("pending");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const handleManageClick = (trainer) => {
    setSelectedTrainer(trainer);
    setIsManageModalOpen(true);
  };

  const closeManageModal = () => {
    setIsManageModalOpen(false);
    setSelectedTrainer(null);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!trainers || trainers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        No trainer found...
      </div>
    );
  }
  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Applied Trainers
      </h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-800 bg-white">
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
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  {trainer.fullName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {trainer.email}
                </td>
                <td className="border px-4 py-2 text-center">{trainer.age}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleManageClick(trainer)}
                    className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isManageModalOpen && (
        <ManageModal
          isOpen={isManageModalOpen}
          onRequestClose={closeManageModal}
          trainer={selectedTrainer}
        />
      )}
    </div>
  );
};

export default AppliedTrainers;
