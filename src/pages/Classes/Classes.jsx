import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Classes = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/classes');
      return data;
    },
  });
  // console.log(classes);

  if (isLoading)  {return <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;}
  if (error) return <div>Error loading classes</div>;
 
 

  return (
    <div className="container text-gray-100 max-w-7xl mx-auto p-4">
    <h1 className="text-3xl  font-bold mb-4 text-center">All Classes</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classes.map((classItem) => (
        <div key={classItem._id} className="border rounded-lg p-4 shadow-md max-w-[400px]">
          <h2 className="text-2xl font-bold text-gray-100">{classItem.name}</h2>
          <img src={classItem.classPhoto || 'https://i.ibb.co/fFYknQL/image-not-found.jpg'} alt={classItem.name} className="w-full h-56 object-cover mt-2 rounded-lg"/>
          <p className="mt-2 text-gray-100">{classItem.description}</p>
          <p className="mt-2 text-gray-100"><strong>Duration:</strong> {classItem.duration} minutes</p>
          <p className="mt-2 text-gray-100"><strong>Difficulty:</strong> {classItem.difficulty}</p>
          <ul className="mt-2 list-disc pl-5">
            {classItem.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-100">{benefit}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold mt-4">Trainers</h3>
          <div className="flex mt-2 space-x-4">
            {classItem?.foundTrainers.length >0 ? classItem?.foundTrainers?.slice(0,3).map((trainer) => (
              <Link key={trainer._id} to={`/trainers/${trainer._id}`} className="flex-shrink-0">
                <img
                  src={trainer.profileImage}
                  alt={trainer.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                  title={trainer.fullName}
                />
              </Link>
            )):<p className='text-sm'>No trainer found!</p>}
          </div>
          
        </div>
      ))}
    </div>
    
  </div>
  );
};

export default Classes;


/*


activeClassName="inline-block mx-1 px-3 py-1 rounded bg-indigo-500 text-white"
<div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedClasses.map((classItem) => (
          <div key={classItem._id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
            <p className="text-gray-100 mb-4">{classItem.description}</p>
            <h4 className="text-lg font-bold mb-2">Trainers</h4>
            <div className="flex space-x-4">
              {classItem.trainers.slice(0, 5).map((trainer) => (
                <Link key={trainer._id} to={`/trainer/${trainer._id}`}>
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-16 h-16 rounded-full"
                    title={trainer.fullName}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
*/