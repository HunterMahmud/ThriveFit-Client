import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden text-white shadow-lg bg-gray-600 p-4">
      <img
        className="w-full h-[270px] object-cover"
        src={trainer.profileImage}
        alt={trainer.fullName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{trainer.fullName}</div>
        <p className="text-gray-100 text-base">
          Years of Experience: {trainer.yearsOfExperience}
        </p>
       
        <div className="mt-4">
          <h3 className="text-lg font-bold">Available Slots:</h3>
          <ul className="list-disc list-inside">
            {trainer.availableTime.map((slot, index) => (
              <li key={index}>{slot.label}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Skills:</h3>
          <ul className="list-disc list-inside">
            {trainer.skills.map((skill, index) => (
              <li key={index}>{skill.label}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <h3 className="text-lg font-bold">Socials links:</h3>
          <a href={trainer.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-2xl" />
          </a>
          <a href={trainer.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-pink-600 text-2xl" />
          </a>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link
          to={`/trainer/${trainer._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default TrainerCard;
