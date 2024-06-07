import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthProvider from "./../../hooks/useAuthProvider";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const Payment = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const today = new Date();

  const { trainer, selectedSlot, pkgName, price, selectedClasses } = location.state || {};
  // console.log(location.state);
  const handleConfirm = async () => {
    // console.log({
    //   trainerName: trainer.fullName,
    //   trainerId: trainer._id,
    //   slotName: selectedSlot,
    //   pkgName,
    //   price,
    //   classes: trainer.skills,
    //   userName: user?.displayName,
    //   userEmail: user.email,
    //   orderDate: today,
    // });
    try {
      //   Send data to the server

      const response = await axiosSecure.post("/payment", {
        trainerName: trainer.fullName,
        trainerId: trainer._id,
        trainerEmail: trainer.email,
        slotName: selectedSlot,
        selectedClasses,
        pkgName,
        price,
        userName: user?.displayName,
        userEmail: user.email,
        orderDate: today,
      });
      if (response.data?.insertedId) {
        // console.log(selectedClasses);
        // when someone payment for the selected slot then inside the selected slot
        // all the classes of selectedClasses value of totalBooked increased by one in db
        const {data} = await axiosSecure.put('classes/update-bookings', {selectedClasses});
        // console.log(data);

        // Handle success (e.g., navigate to a success page, show a success message)
        toast.success("Payment successful!");
        navigate("/alltrainers"); // Replace with your success page route
      }
    } catch (error) {
      toast.error("Error processing payment");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="border rounded-lg p-4 shadow-md overflow-x-auto">
        <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
        <table className="table-auto w-full bg-gray-100 text-black">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">
                Trainer Name
              </td>
              <td className="px-4 py-2">{trainer.fullName}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">Slot Name</td>
              <td className="px-4 py-2">{selectedSlot}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">
                Package Name
              </td>
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
              <td className="px-4 py-2 font-medium text-gray-100">
                Your Email
              </td>
              <td className="px-4 py-2">{user.email}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2 font-medium text-gray-100">
                Order Date
              </td>
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
