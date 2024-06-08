import React from "react";
import TrainerCard from "../../components/AllTrainer/TrainerCard";
import useAllTrainersData from "./../../hooks/useAllTrainersData";

const AllTrainers = () => {
  const [trainers] = useAllTrainersData("success");
  // console.log(trainers);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">All Trainers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto justify-items-center">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
