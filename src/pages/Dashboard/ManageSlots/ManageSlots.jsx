import React, { useState, useEffect } from "react";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "./../../../hooks/useAuthProvider";
import { toast } from "react-toastify";

const ManageSlots = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const {
    data: slotsInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`trainer-slots/${user?.email}`);
      return data;
    },
  });
  //   console.log(user.email);
  // console.log(slotsInfo);

  const deleteSlot = async (slot) => {
    try {
      const { data } = await axiosSecure.delete(
        `/trainer-slots/${user?.email}/${slot.slotName}`
      );
      if (data?.message) {
        toast.success(data.message);
        refetch();
      }
    } catch (error) {
      toast.error("Error deleting slot");
    }
  };

  const handleDeleteClick = (slot) => {
    // console.log(slot);
    setSelectedSlot(slot);
  };
  const confirmDelete = () => {
    if (selectedSlot) {
      // console.log("confirm delete: ", selectedSlot);
      deleteSlot(selectedSlot);
      setSelectedSlot(null);
    }
  };

  const cancelDelete = () => {
    setSelectedSlot(null);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-300.8px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (slotsInfo?.slots.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-800 text-lg">
        no slot found please add some slot...
      </div>
    );
  }
  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Manage Slots
      </h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-gray-800 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Serial</th>
              <th className="px-4 py-2">Slot Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slotsInfo?.slots?.map((slot, index) => (
              <tr key={index} className="bg-gray-100 text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{slot.slotName}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(slot)}
                    className="inline-block rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete the slot "{selectedSlot.slotName}
              "?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={cancelDelete}
                className="inline-block rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-400 focus:outline-none focus:ring mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="inline-block rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 focus:outline-none focus:ring"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-7">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          All Booked Slots
        </h1>
        {slotsInfo?.payments.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-gray-800 bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Serial</th>
                    <th className="px-4 py-2">Booked By</th>
                    <th className="px-4 py-2">Slot Name</th>
                    <th className="px-4 py-2">Package Name</th>
                  </tr>
                </thead>
                <tbody>
                  {slotsInfo?.payments?.map((payment, index) => (
                    <tr key={payment._id} className="bg-gray-100 text-center">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{payment.userName}</td>
                      <td className="border px-4 py-2">{payment.slotName}</td>
                      <td className="border px-4 py-2">{payment.pkgName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-gray-800 bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">None of your slot booked yet.</th>
                </tr>
              </thead>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSlots;
