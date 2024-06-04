import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Classes = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: classes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/classes");
      return data;
    },
  });
  // console.log(classes);

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) return <div>Error loading classes</div>;

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl  font-bold mb-4 text-center">All Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg p-4 shadow-md max-w-[400px]"
          >
            <h2 className="text-2xl font-bold text-gray-100">
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
            <p className="mt-2 text-gray-100"> <strong>Discription: </strong>{classItem.description}</p>
            
            <p className="mt-2 text-gray-100">
              <strong>Difficulty:</strong> {classItem.difficulty}
            </p>
            <ul className="mt-2 list-disc pl-5">
              {classItem.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-100">
                  {benefit}
                </li>
              ))}
            </ul>
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

export default Classes;
