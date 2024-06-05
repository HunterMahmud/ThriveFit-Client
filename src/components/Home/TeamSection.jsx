import React from "react";
import { Link } from "react-router-dom";
import useAllTrainersData from './../../hooks/useAllTrainersData';

const TeamSection = () => {


const [trainers, _, isLoading] = useAllTrainersData("success");

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

 

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Meet Our Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainers.slice(0, 3).map((trainer) => (
          <div
            key={trainer._id}
            className="border rounded-lg p-4 shadow-md max-w-[400px]"
          >
            <img
              src={trainer.profileImage || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={trainer.fullName}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <h2 className="text-2xl font-bold text-gray-100 mt-4">
              {trainer.fullName}
            </h2>
            <p className="mt-2 text-gray-100">{trainer.aboutMe.substring(0, 100)}...</p>
            <h3 className="text-xl font-bold mt-4">Areas of Expertise</h3>
            <ul className="mt-2 list-disc pl-5">
              {trainer.skills.map((skill, index) => (
                <li key={index} className="text-gray-100">
                  {skill.label}
                </li>
              ))}
            </ul>
            <Link
              to={`/trainers/${trainer._id}`}
              className="text-blue-500 mt-4 inline-block"
            >
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
