import React, { useState } from "react";
import RejectModal from "./RejectModal";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageModal = ({ isOpen, onRequestClose, trainer }) => {
  const axiosSecure = useAxiosSecure();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // console.log(trainer);
  const handleConfirm = async () => {
    try {
      const { data } = await axiosSecure.patch(`/trainers/${trainer._id}`, {
        status: "success",
      });
      
      if (data.modifiedCount > 0) {
        const { data: isTrainer } = await axiosSecure.patch(
          `/user/${trainer.email}`,
          { role: "trainer" }
        );
        if (isTrainer.modifiedCount > 0) {
          toast.success("User is now a Trainer!");
          onRequestClose();
        }
      }
    } catch (error) {
      // console.error("Error confirming trainer:", error);
      toast.error("Operation unsuccessfull!")
      onRequestClose();
    }
  };

  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white text-gray-900 p-4 rounded shadow-lg w-full max-w-md">
          <button
            onClick={onRequestClose}
            className="absolute top-2 bg-gray-200 right-2 text-gray-900 hover:bg-red-500 py-1 p-2 text-lg"
          >
            &times;
          </button>
          <h2 className="text-2xl mb-4 font-bold text-center">Manage Trainer</h2>
          <div className="mb-4">
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl text-center mt-4 font-bold">{trainer.fullName}</h3>
            <p>Email: {trainer.email}</p>
            <p>Age: {trainer.age}</p>
            <p>Experience: {trainer.yearsOfExperience} years</p>
            <p>
              Skills: {trainer.skills.map((skill) => skill.label).join(", ")}
            </p>
            <p>
              Available Days:{" "}
              {trainer.availableDays
                .map((availableDay) => availableDay.label)
                .join(", ")}
            </p>
            
          </div>
          <button
            onClick={handleConfirm}
            className="block w-full bg-green-600 text-white py-2 rounded mb-2"
          >
            Confirm
          </button>
          <button
            onClick={handleReject}
            className="block w-full bg-red-600 text-white py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
      {isRejectModalOpen && (
        <RejectModal
          isOpen={isRejectModalOpen}
          onRequestClose={closeRejectModal}
          trainer={trainer}
        />
      )}
    </>
  );
};

export default ManageModal;
