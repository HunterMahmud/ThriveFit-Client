import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { LuMailPlus } from "react-icons/lu";
import useTrainerData from "./../../hooks/useTrainerData";

const TrainerDetails = () => {
  const { id } = useParams();
  const [trainer, isLoading, error] = useTrainerData({id});
  // console.log(trainer);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trainer details</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 text-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <img
                src={
                  trainer.profileImage ||
                  "https://i.ibb.co/fFYknQL/image-not-found.jpg"
                }
                alt={trainer.fullName}
                className="w-24 h-24 rounded-full mr-4 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{trainer.fullName}</h2>
                <p className="text-gray-200">
                  {trainer?.yearsOfExperience} years of experience
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-col sm:flex-row">
              <div>
                <h3 className="text-xl font-bold mb-2">Skills</h3>
                <ul className="list-disc list-inside">
                  {trainer?.skills?.map((skill, index) => (
                    <li key={index}>{skill.label}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Available Days</h3>
                <ul className="list-disc list-inside">
                  {trainer?.availableDays?.map((day, index) => (
                    <li key={index}>{day.label}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <div className="flex space-x-4">
                {trainer?.facebook && (
                  <a
                    href={trainer.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-2xl text-blue-500" />
                  </a>
                )}
                {trainer?.instagram && (
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-2xl text-pink-500" />
                  </a>
                )}
                {trainer?.email && (
                  <a
                    href={`mailto:${trainer.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LuMailPlus className="text-2xl text-red-500" />
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
              {trainer?.slots?.map((slot, index) => (
                <Link
                  key={index}
                  to={`/trainer/${trainer._id}?slot=${slot.slotName}`}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                >
                  {slot.slotName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-white shadow-md rounded-lg p-6 mt-5 max-w-7xl mx-auto">
        <h3 className="text-xl font-bold mb-4">About Me:</h3>
        {trainer?.aboutMe ? (
          <p>{trainer.aboutMe}</p>
        ) : (
          <p>This trainer doesn't add anything on his about.</p>
        )}
      </div>
      <div className="mt-5 rounded-lg text-center text-white max-w-7xl mx-auto">
        <div className="w-full rounded-lg bg-cover bg-[url('https://i.ibb.co/f95QT6x/bodybuildertrainer.jpg')] bg-center ">
          <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
            <h1 className="text-5xl antialiased font-semibold leading-none text-center ">
              Empower Your Passion <br /> Become a Trainer
            </h1>
            <p className="pt-2 pb-8 text-xl antialiased text-center">
              Share your fitness expertise and help others achieve their goals.
              Join our team of passionate trainers.
            </p>
            <div className="flex flex-row justify-center items-center">
              <Link
                to="/dashboard/beatrainer"
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700"
              >
                Be A Trainer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;

/*

*/
