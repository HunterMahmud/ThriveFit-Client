import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";

const BeATrainer = () => {
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
      availableTime: [],
    },
  });

  const skillsOptions = [
    { value: "strength_training", label: "Strength Training" },
    { value: "cardio", label: "Cardio" },
    { value: "yoga", label: "Yoga" },
    { value: "pilates", label: "Pilates" },
    // Add more skills as needed
  ];

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
    console.log(data);
    const trainerInfo = {
      ...data,
      email:"alibaliteja@gmail.com",
      age: parseInt(data.age),
      yearsOfExperience: parseInt(data.yearsOfExperience),
      status: "pending",
    };
    try {
      // Send data to the server
      const { data } = await axiosSecure.post("/trainers", trainerInfo);
      console.log(data);
      if (data) {
        toast.success(
          "Application submitted successfully! Wait for admin approval."
        );
        // reset(); // Reset the form
      }
    } catch (error) {
      toast.error("Error submitting the form");
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Apply to Be a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300  bg-gray-100 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
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
              <Select
                {...field}
                isMulti
                options={skillsOptions}
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
            Available Time
          </label>
          <Controller
            name="availableTime"
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
            Facebook Profile
          </label>
          <input
            type="url"
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
            {...register("instagram")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
