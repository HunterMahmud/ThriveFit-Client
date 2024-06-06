import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const RecommendedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/featured-classes");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error loading recommended classes</div>;
  }

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Recommended Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg p-4 shadow-md max-w-[400px]"
          >
            <img
              src={classItem.classPhoto || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={classItem.name}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <h2 className="text-2xl font-bold text-gray-100 mt-4">
              {classItem.name}
            </h2>
            <p className="mt-2 text-gray-100">
              <strong>Description:</strong> {classItem.description}
            </p>
            <p className="mt-2 text-gray-100">
              <strong>Difficulty:</strong> {classItem.difficulty}
            </p>
            <p className="mt-2 text-gray-100">
              <strong>Total Booked:</strong> {classItem.totalBooked}
            </p>
            <ul className="mt-2 list-disc pl-5">
              {classItem.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-100">
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              to={`/classes/${classItem._id}`}
              className="text-blue-500 mt-4 inline-block"
            >
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClasses;
