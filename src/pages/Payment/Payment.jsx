import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const Payment = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const today = new Date();
  
  const { trainer, selectedSlot, pkgName, price } = location.state || {};
  console.log(location.state);
  const handleConfirm = async () => {
    try {
      // Send data to the server
      const response = await axiosSecure.post('/payment', {
        trainerName:trainer.fullName,
        slotName: selectedSlot,
        packageName,
        price,
        userName: user.fullName,
        userEmail: user.email,
        userAge: user.age,
        userYearsOfExperience: user.yearsOfExperience,
      });
      if (response.data) {
        // Handle success (e.g., navigate to a success page, show a success message)
        console.log('Payment successful:', response.data);
        navigate('/success'); // Replace with your success page route
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="border rounded-lg p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
        <table className="table-auto w-full bg-gray-800 text-white">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Trainer Name</td>
              <td className="px-4 py-2">{trainer.fullName}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Slot Name</td>
              <td className="px-4 py-2">{selectedSlot}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Package Name</td>
              <td className="px-4 py-2">{pkgName}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Price</td>
              <td className="px-4 py-2">${price}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Your Name</td>
              <td className="px-4 py-2">{user.displayName}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Your Email</td>
              <td className="px-4 py-2">{user.email}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Order Date</td>
              <td className="px-4 py-2">{today.toLocaleDateString()}</td>
            </tr>
            
            
          </tbody>
        </table>
        <button
          onClick={handleConfirm}
          className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Payment;


/*

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthProvider from './../../hooks/useAuthProvider';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const Payment = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { trainerId, selectedSlot, package:packageName,price } = location.state || {};
  console.log(location.state);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      trainerName: '',
      slotName: selectedSlot,
      packageName: packageName,
      price: price,
      userName: user.fullName,
      userEmail: user.email,
      userAge: user.age,
      userYearsOfExperience: user.yearsOfExperience,
    },
  });

  const onSubmit = async (data) => {
    try {
      // Send data to the server
      const response = await axiosSecure.post('/payment', {
        ...data,
        trainerId,
      });
      if (response.data) {
        // Handle success (e.g., navigate to a success page, show a success message)
        console.log('Payment successful:', response.data);
        navigate('/success'); // Replace with your success page route
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="border rounded-lg p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Trainer Name</label>
            <input
              type="text"
              {...register('trainerName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Slot Name</label>
            <input
              type="text"
              {...register('slotName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Package Name</label>
            <input
              type="text"
              {...register('packageName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Price</label>
            <input
              type="text"
              {...register('price')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">User Name</label>
            <input
              type="text"
              {...register('userName')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Email</label>
            <input
              type="text"
              {...register('userEmail')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Age</label>
            <input
              type="text"
              {...register('userAge')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">Years of Experience</label>
            <input
              type="text"
              {...register('userYearsOfExperience')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

*/