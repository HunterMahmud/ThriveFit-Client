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
      const { data } = await axiosPublic.get(`/classes?limit=${3}&sort=${-1}`);
      return data;
    },
    keepPreviousData: true,
  });
  //todo:loading and error
  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  //todo:loading
  const { classes } = classData;
  // console.log(classes);

  if (error) {
    return <div>Error loading featured classes</div>;
  }

  return (
    <MaxWidthProvider>
    <div className="max-w-7xl mx-auto">
    <div className=" text-gray-900 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold my-10 text-center">
          Featured Classes
        </h1>
        <div className="mx-2">
        <div className=" container grid grid-cols-1 md:grid-cols-2 mx-auto justify-between lg:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="border flex flex-col   rounded-lg p-4 shadow-md max-w-[400px]"
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
                <strong>Description:</strong> {classItem.description}
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
