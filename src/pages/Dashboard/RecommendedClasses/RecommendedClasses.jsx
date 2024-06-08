import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from 'react-helmet-async';

const RecommendedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: classData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/classes?limit=${3}&sort=${-1}`);
      return data;
    },
    keepPreviousData: true,
  });
  const { classes } = classData;

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <Helmet>
        <title>ThriveFit | Loading Recommended Classes</title>
      </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        <Helmet>
        <title>ThriveFit | Error Loaring Recommended Classes</title>
      </Helmet>
        Error loading recommended classes...
      </div>
    );
  }

  return (
    <div className="container text-gray-900 max-w-7xl mx-auto p-4 my-10">
      <Helmet>
        <title>ThriveFit | Recommended Classes</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-7 text-center">
        Classes You May Like
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg p-4 shadow-md max-w-sm w-full"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              {classItem.name}
            </h2>
            <img
              src={
                classItem.classPhoto ||
                "https://i.ibb.co/fFYknQL/image-not-found.jpg"
              }
              alt={classItem.name}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <p className="mt-2 text-gray-900">
              {" "}
              <strong>Description: </strong>
              {classItem.description}
            </p>
            <p className="mt-2 text-gray-900">
              <strong>Difficulty:</strong> {classItem.difficulty}
            </p>
            <ul className="mt-2 list-disc pl-5">
              {classItem?.benefits?.map((benefit, index) => (
                <li key={index} className="text-gray-900">
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="text-gray-900 mt-2">
              Total Booked: {classItem.totalBooked}
            </p>
            <h3 className="text-xl font-bold mt-4">Trainers</h3>
            <div className="flex mt-2 space-x-4">
              {classItem?.foundTrainers?.length > 0 ? (
                classItem?.foundTrainers?.slice(0, 3).map((trainer) => (
                  <Link
                    key={trainer._id}
                    to={`/trainers/${trainer._id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={trainer.profileImage}
                      alt={trainer.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                      title={trainer.fullName}
                    />
                  </Link>
                ))
              ) : (
                <p className="text-sm">No trainer found!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClasses;
