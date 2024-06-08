import React from "react";
import { Link } from "react-router-dom";
import MaxWidthProvider from "../../hooks/MaxWidthProvider";
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
    <MaxWidthProvider>
      <div className="container text-gray-900 max-w-7xl mx-auto my-10">
      <h1 className="text-3xl sm:text-5xl font-extrabold  text-center ">Meet Our Trainers</h1>
      <p className="mb-10 mt-4 font-light max-w-[900px] mx-auto text-center text-gray-500  sm:text-xl">
          Meet Popular Trainers
          </p>
     <div className="mx-2">
     <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 ">
        {trainers.slice(0, 3).map((trainer) => (
          <div
            key={trainer._id}
            className="w-full border rounded-lg p-4  shadow-md max-w-sm"
          >
           <div className="w-full h-56 ">
           <img
              src={trainer.profileImage || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={trainer.fullName}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
           </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {trainer.fullName}
            </h2>
            <p className="mt-2 text-gray-800">{trainer.aboutMe.substring(0, 100)}...</p>
            <h3 className="text-xl font-bold mt-4">Areas of Expertise</h3>
            <ul className="mt-2 list-disc pl-5">
              {trainer.skills.map((skill, index) => (
                <li key={index} className="text-gray-800">
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
    </div>
    </MaxWidthProvider>
  );
};

export default TeamSection;
