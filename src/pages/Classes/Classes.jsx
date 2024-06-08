import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

const Classes = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;

  const {
    data: classData = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", currentPage, searchQuery],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/classes?page=${currentPage}&limit=${limit}&search=${searchQuery}&sort=${1}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const { classes = [], totalPages } = classData;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
          <Helmet>
        <title>ThriveFit | Loading All Classes</title>
      </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
          <Helmet>
        <title>ThriveFit | Error Loading Classes</title>
      </Helmet>
        Error loading classes data...
      </div>
    );
  }

  return (
    <div className="container text-gray-900 max-w-7xl mx-auto p-4">
      <Helmet>
        <title>ThriveFit | All Classes</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 text-center">All Classes</h1>
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search classes..."
            className="w-full p-2 border bg-white border-gray-300 rounded"
          />
          <button
            type="submit"
            className="ml-1 p-[12px] px-7 bg-blue-500 text-white rounded"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-4 mx-auto">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="border rounded-lg p-4 shadow-md max-w-sm w-full"
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
              {" "}
              <strong>Description: </strong>
              {classItem.description}
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Difficulty:</strong> {classItem.difficulty}
            </p>
            <p className="mt-2 text-gray-800">
              <strong>Benefits:</strong>
            </p>
            <ul className="mt-2 list-disc pl-5">
              {classItem?.benefits?.map((benefit, index) => (
                <li key={index} className="text-gray-800">
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
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Classes;
