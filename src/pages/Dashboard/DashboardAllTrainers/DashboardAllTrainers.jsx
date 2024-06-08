import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAllTrainersData from './../../../hooks/useAllTrainersData';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import ConfirmationModal from './ConfirmationModal';
import { Helmet } from 'react-helmet-async';

const DashboardAllTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [trainers, refetch, isLoading] = useAllTrainersData('success');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDelete = async (trainerId, email) => {
    try {
      const { data } = await axiosSecure.delete(`/trainers/${trainerId}`);
      if (data.deletedCount > 0) {
        const { data: roleUpdate } = await axiosSecure.patch(`/user/${email}`, {
          role: 'member',
        });
        if (roleUpdate.modifiedCount > 0) {
          toast.success('Trainer removed!');
          refetch();
        }
      }
    } catch (err) {
      toast.error("Can't delete, error occurred!");
    }
  };

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  const confirmDelete = () => {
    if (selectedTrainer) {
      handleDelete(selectedTrainer._id, selectedTrainer.email);
    }
    closeModal();
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <Helmet>
        <title>ThriveFit | Loading All Trainer</title>
      </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 ">
      <Helmet>
        <title>ThriveFit | All Trainer</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">All Trainers</h1>
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
                <td className="border px-4 py-2 text-center">{trainer.fullName}</td>
                <td className="border px-4 py-2 text-center">{trainer.email}</td>
                <td className="border px-4 py-2 text-center">{trainer.age}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => openModal(trainer)}
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default DashboardAllTrainers;
