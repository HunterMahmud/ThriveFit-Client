import React, { useState } from "react";
import axios from "axios";
import PaymentInfo from "./PaymentInfo";
import useAuthProvider from "./../../../hooks/useAuthProvider";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';

const BookedTrainer = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const {
    data: paymentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainerData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buyer/${user?.email}`);
      return data;
    },
  });

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFeedback("");
    setRating(0);
    setSelectedPayment(null);
  };

  const handleRatingChange = (newRating) => setRating(newRating);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmitReview = () => {
    // console.log(selectedPayment, user?.photoURL, feedback, rating);
    if (selectedPayment && feedback && rating) {
      axiosSecure
        .post("/reviews", {
          trainerId: selectedPayment.trainerId,
          // trainerName,
          userEmail: selectedPayment.userEmail,
          userName: user?.displayName || "not found",
          feedback,
          userImage:
            user?.photoURL || "https://i.ibb.co/2Stm18N/image-not-found.jpg",
          rating,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data?.insertedId) {
            toast.success("Review submitted successfully");
            closeModal();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error submitting review");
        });
    }
    else{
      toast.info("Please fillout the field")
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Helmet>
          <title>ThriveFit | Loading Booked Data</title>
        </Helmet>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        <Helmet>
          <title>ThriveFit | Error Loading Booked Data</title>
        </Helmet>
        Error loading booked data...
      </div>
    );
  }

  if (paymentData?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        <Helmet>
          <title>ThriveFit | No Booked Data Found</title>
        </Helmet>
        No Booked Data Found
      </div>
    );
  }

  return (
    <div className="p-4 text-black">
      <Helmet>
        <title>ThriveFit | Booked Data</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Booked Trainer Details</h1>
      {paymentData.map((payment) => (
        <PaymentInfo key={payment._id} payment={{ ...payment, openModal }} />
      ))}

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Submit Review</h2>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              maxLength={230}
              placeholder="Write your feedback here (max 230 characters)"
              className="w-full border rounded p-2 mb-4 bg-white"
            />
            <div className="flex items-center mb-4">
              <span className="mr-2">Rating:</span>
              {[...Array(5)].map((star, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRatingChange(index + 1)}
                  className={`text-2xl ${
                    rating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmitReview}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2 transition"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
