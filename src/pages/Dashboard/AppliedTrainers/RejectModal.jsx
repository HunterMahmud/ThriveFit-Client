import React, { useState } from 'react';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const RejectModal = ({ isOpen, onRequestClose, trainer }) => {
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState('');
// console.log(trainer);
  const handleReject = async () => {
    try {
      const {data} = await axiosSecure.patch(`/trainers/${trainer._id}/reject`, { feedback });
      // console.log(data);
      if(data.modifiedCount>0){
        toast.success("Rejected");
        onRequestClose();
      }
    } catch (error) {
      toast.error('Error rejecting trainer:');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white text-gray-900 p-4 rounded shadow-lg w-full max-w-md">
        <button
          onClick={onRequestClose}
          className="absolute top-2 py-1 p-2 text-lg bg-gray-200 right-2 hover:bg-red-500 text-gray-900"
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 font-bold text-center">Reject Trainer</h2>
        <div className="mb-4">
          <img src={trainer.profileImage} alt={trainer.fullName} className="w-32 h-32 rounded-full mx-auto" />
          <h3 className="text-xl mt-4 font-bold text-center">{trainer.fullName}</h3>
          <p>Email: {trainer.email}</p>
          <p>Age: {trainer.age}</p>
          <p>Experience: {trainer.yearsOfExperience} years</p>
          <p>Skills: {trainer.skills.map(skill => skill.label).join(', ')}</p>
          <p>Available Days: {trainer.availableDays.map(availableDay => availableDay.label).join(', ')}</p>
          
        </div>
        <textarea
          className="w-full p-2 border bg-white  rounded"
          placeholder="Enter feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          onClick={handleReject}
          className="block w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default RejectModal;
