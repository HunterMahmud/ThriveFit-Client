import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from './../../hooks/useAxiosPublic';

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featured-classes");
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
    return <div>Error loading featured classes</div>;
  }

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Featured Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div key={classItem._id} className="border rounded-lg p-4 shadow-md max-w-[400px]">
            <h2 className="text-2xl font-bold text-gray-100">{classItem.name}</h2>
            <img
              src={classItem.classPhoto || "https://i.ibb.co/fFYknQL/image-not-found.jpg"}
              alt={classItem.name}
              className="w-full h-56 object-cover mt-2 rounded-lg"
            />
            <p className="mt-2 text-gray-100"><strong>Description:</strong> {classItem.description}</p>
            <p className="mt-2 text-gray-100"><strong>Total Bookings:</strong> {classItem.totalBooked}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
