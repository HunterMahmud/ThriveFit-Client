import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthProvider from "../../../hooks/useAuthProvider";
import useTrainerData from "./../../../hooks/useTrainerData";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const AddNewSlot = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthProvider();
  //   console.log(user.email);
  const [trainer, isLoading, error] = useTrainerData({ email: user?.email });
  const { data: className = [], isLoading: isClassLoading } = useQuery({
    queryKey: ["className"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/classnames");
      return data;
    },
  });
  // console.log(className);

  //   console.log(trainer);
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      availableDays: [],
      slotName: "",
      slotTime: 0,
      selectedClasses: [],
    },
  });

  useEffect(() => {
    if (trainer) {
      setValue(
        "availableDays",
        trainer?.availableDays?.map((day) => ({
          value: day.value,
          label: day.label,
        }))
      );
    }
  }, [trainer, setValue]);

  const daysOptions = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];
  //class related fileld and skillsOptions will be the class names

  const selectedClasses = className.map((cls) => {
    const clses = {
      value: cls.name,
      label: cls.name,
    };
    return clses;
  });

  const onSubmit = async (slotInfo) => {
    // console.log(slotInfo);
    try {
      const { data } = await axiosSecure.post(
        `/trainer-add-slot/${user?.email}`,
        slotInfo
      );
      // console.log(data);
      if (data.message) {
        toast.success("Slot created");
        reset();
      }
    } catch (error) {
      // console.log(error);
      toast.error("Can't add the slot");
    }
  };

  if (isLoading || isClassLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <Helmet>
        <title>ThriveFit | Loading Add New Slot</title>
      </Helmet>
        
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        <Helmet>
        <title>ThriveFit | Error Loading Add New Slot</title>
      </Helmet>
        
        Error loading trainer data...
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-lg">
        
        <Helmet>
        <title>ThriveFit | You are not a trainer</title>
      </Helmet>
        You are not a trainer.
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg my-7">
      <Helmet>
        <title>ThriveFit | Add New Slot</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Your Previous Info
        </h2>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Full Name : {trainer.fullName}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Email : {trainer.email}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Age : {trainer.age}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Years of Experience : {trainer.yearsOfExperience}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Profile Image URL : {trainer.profileImage}
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Skills :{" "}
            {trainer?.skills?.map((skill, index) => (
              <span className="mr-2" key={index}>
                {skill.value}
              </span>
            ))}
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Available Time : {trainer.availableTime} (hour)
          </p>
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Facebook Profile : {trainer.facebook}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Instagram Profile : {trainer.instagram}
          </p>
        </div>
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            About Yourself : {trainer.aboutMe}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 mt-7">
          Add New Slot
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
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
            <label className="block font-bold text-gray-900">Slot Name:</label>
            <input
              type="text"
              {...control.register("slotName", { required: true })}
              className="w-full p-2 border border-gray-300 rounded bg-white"
              placeholder="Ex: Morning"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-900">Slot Time:</label>
            <input
              type="number"
              {...control.register("slotTime", { required: true })}
              className="w-full p-2 border border-gray-300 rounded bg-white"
              placeholder="Ex: 60 mins"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">
              Class
            </label>
            <Controller
              name="selectedClasses"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={selectedClasses}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          >
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewSlot;
