import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { LuMailPlus } from "react-icons/lu";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: trainer={}, isLoading, error } = useQuery({
    queryKey: ['trainer', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trainers/${id}`);
      return data;
    },
  });
console.log(trainer);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trainer details</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 text-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <img src={trainer.profileImage} alt={trainer.fullName} className="w-24 h-24 rounded-full mr-4 object-cover" />
              <div>
                <h2 className="text-2xl font-bold">{trainer.fullName}</h2>
                <p className="text-gray-200">{trainer.yearsOfExperience} years of experience</p>
              </div>
            </div>
            <div className='flex justify-between flex-col sm:flex-row'>
              <div >
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <ul className="list-disc list-inside">
                {trainer.skills.map((skill, index) => (
                  <li key={index}>{skill.label}</li>
                ))}
              </ul>
              </div>
              <div>
              <h3 className="text-xl font-bold mb-2">Available Days</h3>
              <ul className="list-disc list-inside">
                {trainer.availableDays.map((day, index) => (
                  <li key={index}>{day.label}</li>
                ))}
              </ul>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <div className="flex space-x-4">
                {trainer.facebook && (
                  <a href={trainer.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-2xl text-blue-500"/>
                  </a>
                )}
                {trainer.instagram && (
                  <a href={trainer.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-2xl text-pink-500"/>
                  </a>
                )}
                {trainer.email && (
                  <a href={`mailto:${trainer.email}`}  target="_blank" rel="noopener noreferrer">
                    <LuMailPlus className="text-2xl text-red-500"/>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-800 text-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Available Slots</h3>
            <div className="grid grid-cols-1 gap-2">
              {trainer.availableTime.map((slot, index) => (
                <Link
                  key={index}
                  to={`/trainer/${trainer._id}/book?slot=${slot.value}`}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                >
                  {slot.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white shadow-md rounded-lg p-6 mt-5 max-w-7xl mx-auto">
        <h3 className="text-xl font-bold mb-4">About Me:</h3>
        {
            trainer?.aboutMe ? <p>{trainer.aboutMe}</p> : <p>This trainer doesn't add anything on his about.</p>
        }
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/be-a-trainer"
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700"
        >
          Become a Trainer
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
