import React, { useState } from "react";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddNewClass = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "",
    benefits: [],
    classPhoto: "",
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [benefitsList, setBenefitsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBenefitAdd = () => {
    if (benefitInput) {
      setBenefitsList([...benefitsList, benefitInput]);
      setFormData({ ...formData, benefits: [...benefitsList, benefitInput] });
      setBenefitInput("");
    }
  };

  const handleBenefitRemove = (benefit) => {
    const updatedBenefits = benefitsList.filter((b) => b !== benefit);
    setBenefitsList(updatedBenefits);
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.classPhoto &&
      formData.description &&
      formData.difficulty &&
      formData.benefits.length > 0
    ) {
      try {
        // console.log(formData);
        const { data } = await axiosSecure.post("/classes", {...formData, totalBooked: 0});
        if (data.insertedId) {
          toast.success("Class added successfully");
          setFormData({
            name: "",
            description: "",
            difficulty: "",
            benefits: [],
            classPhoto: "",
          });
          setBenefitsList([]);
        }
      } catch (error) {
        // console.error("Error adding class:", error);
        toast.error("Failed to add class");
      }
    } else {
      toast.info("Please fill in all fields");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded shadow-md mt-7">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Add New Class
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Class Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded bg-white"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="classPhoto"
            value={formData.classPhoto}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Benefits</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              className="w-full p-2 border-2 rounded bg-white mr-2"
            />
            <button
              type="button"
              onClick={handleBenefitAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div>
            {benefitsList.map((benefit, index) => (
              <div key={index} className="flex items-center mb-1">
                <span className="mr-2">{benefit}</span>
                <button
                  type="button"
                  onClick={() => handleBenefitRemove(benefit)}
                  className="text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
