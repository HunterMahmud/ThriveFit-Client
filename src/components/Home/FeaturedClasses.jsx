import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import MaxWidthProvider from "./../../hooks/MaxWidthProvider";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: classData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classess"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/classes?limit=${6}&sort=${-1}`);
      return data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { classes } = classData;
  // console.log(classes);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        Error loading featured classes...
      </div>
    );
  }

  return (
    <MaxWidthProvider>
      <div className="max-w-7xl container mx-auto">
        <div className="container text-gray-900 max-w-7xl my-10 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold  text-center">
            Featured Classes
          </h1>
          <p className="mb-10 mt-4 font-light text-center text-gray-500  sm:text-xl">
          Most Booked Classes
        </p>
          <div className="mx-2">
            <div className=" container grid grid-cols-1 md:grid-cols-2 mx-auto justify-items-center lg:grid-cols-3 gap-4">
              {classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="border flex flex-col   rounded-lg p-4 shadow-md max-w-sm w-full"
                >
                  <h2 className="text-2xl font-bold text-gray-800">
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
                  <p className="mt-2 text-gray-800">
                    <strong>Description:</strong>{" "}
                    {classItem?.description?.length > 20
                      ? classItem?.description
                      : classItem?.description}
                  </p>
                  <p className="mt-2 text-gray-800">
                    <strong>Total Bookings:</strong> {classItem.totalBooked}
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
        </div>
      </div>
    </MaxWidthProvider>
  );
};

export default FeaturedClasses;
