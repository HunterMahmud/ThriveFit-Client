import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const BeATrainer = () => {
  const navigate = useNavigate()
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();



  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: user.email,
      age: "",
      yearsOfExperience: "",
      profileImage: "",
      skills: [],
      availableDays: [],
      availableTime: 0,
      aboutMe:''
    },
  });



  const daysOptions = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];

  const onSubmit = async (data) => {
 
    // console.log(data);
    const trainerInfo = {
      ...data,
      age: parseInt(data.age),
      slots:[],
      availableTime: parseInt(data.availableTime),
      yearsOfExperience: parseInt(data.yearsOfExperience),
      status: "pending",
    };
    // console.log(trainerInfo);
    try {
      // Send data to the server
      const { data } = await axiosSecure.post("/trainers", trainerInfo);
      // console.log(data);
      if(data?.message==='pending'){
        toast.info('Already applied. Wait for admin approval!')
        navigate('/dashboard/activitylog');
      }
      else if(data?.message === 'rejected'){
        toast.error("You are rejected. Delete application from Activity log to ReApply!");
        navigate('/dashboard/activitylog');
      }
      else if(data) {
        toast.success(
          "Application submitted successfully! Wait for admin approval."
        );
        reset(); // Reset the form
        navigate('/dashboard/activitylog');
      }
    } catch (error) {
      toast.error("Error submitting the form");
      // console.log(error.message);
    }
  };
  //if(isLoading) {return <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;}
  
  
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>ThriveFit | Be A Trainer</title>
      </Helmet>
      <h2 className="text-3xl  font-bold text-gray-900 mb-6">Apply to Be a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Ex: Bill Gates"
            {...register("fullName", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            
            {...register("email")}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300  bg-gray-100 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            
          placeholder="Ex: 32"
            {...register("age", {
              required: {
                value: true,
                message: "This field is required.",
              },
              min: {
                value: 1,
                message: "Age must be greater than zero.",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
          placeholder="Ex: 12"
            type="number"
            {...register("yearsOfExperience", {
              required: {
                value: true,
                message: "This field is required.",
              },
              min: {
                value: 0,
                message: "Experience cann't be lower than zero.",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image URL
          </label>
          <input
          placeholder="https://www.website.com/yourphoto.jpg"
            type="url"
            {...register("profileImage", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
              Skills
          </label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available Days
          </label>
          <Controller
            name="availableDays"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={daysOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Available Time (hour)
          </label>
          <input
          placeholder="Ex: 12"
            type="number"
            {...register("availableTime", {
              required: {
                value: true,
                message: "This field is required.",
              },
              min: {
                value: 0,
                message: "Experience cann't be lower than zero.",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Facebook Profile
          </label>
          <input
            type="url"
            placeholder="https://www.facebook.com/yourName"
            {...register("facebook")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Instagram Profile
          </label>
          <input
            type="url"
            placeholder="https://www.instagram.com/yourName"
            {...register("instagram")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">About Yourself</label>
          <textarea
          placeholder="Write details about yourself..."
            {...register('aboutMe')}
            className="mt-1 block w-full px-3 py-2 border bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeATrainer;
