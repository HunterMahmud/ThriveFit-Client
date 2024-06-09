import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const { user, userUpdateProfile, setLoading } = useAuthProvider();
  // console.log(user?.photoURL);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      fullName: "",
      profilePicture: "",
      email: "",
      lastLogin: "",
    },
  });

  useEffect(() => {
    // Set the default values from the user object
    setValue("fullName", user.displayName);
    setValue("profilePicture", user?.photoURL);
    setValue("email", user.email);
    setValue("lastLogin", user?.metadata?.lastSignInTime); // Assuming last login info is here
  }, [user, setValue]);

  const onSubmit = async (userInfo) => {
    try {
      // Update MongoDB
      const response = await axiosSecure.put(`/users/${user.email}`, {
        fullName: userInfo.fullName,
        profilePicture: userInfo.profilePicture,
      });
    //   console.log("response", response);
      if (response.status === 200) {
        // Update Firebase
        await userUpdateProfile(
          userInfo.fullName,
          userInfo.profilePicture
        );

        
        toast.success("Profile updated successfully");
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg my-7">
      <Helmet>
        <title>ThriveFit | {user?.displayName}'s Profile</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        User Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block  text-sm font-medium text-gray-800">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="w-full p-2 border bg-white border-gray-300 rounded text-gray-800"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Profile Picture URL
          </label>
          <input
            type="text"
            {...register("profilePicture")}
            className="w-full p-2 border bg-white border-gray-300 rounded text-gray-800"
            placeholder="Enter the URL of your profile picture"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border cursor-not-allowed border-gray-300 rounded bg-gray-100"
            placeholder="Enter your email"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            Last Login
          </label>
          <input
            type="text"
            {...register("lastLogin")}
            className="w-full p-2 border cursor-not-allowed border-gray-300 rounded bg-gray-100"
            placeholder="Last login time"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded  hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
