import React from 'react';

const PaymentInfo = ({ payment }) => {
  return (
    <div className="mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Trainer Info</h2>
            <p className="text-gray-600">Name: {payment.trainerName}</p>
            <p className="text-gray-600">Email: {payment.trainerEmail}</p>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Slot Info</h2>
            <p className="text-gray-600">Slot Name: {payment.slotName}</p>
          </div>

          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Classes Info</h2>
            <ul className="list-disc list-inside text-gray-600">
              {payment.selectedClasses.map((classInfo, index) => (
                <li key={index}>{classInfo.label}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Other Info</h2>
            <p className="text-gray-600">Package Name: {payment.pkgName}</p>
            <p className="text-gray-600">Price: ${payment.price}</p>
            <p className="text-gray-600">Order Date: {new Date(payment.orderDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-4 text-center lg:text-right">
          <button
            onClick={() => payment.openModal(payment)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Review
          </button>
        </div>
      </div>
      <hr className="my-6 border-gray-300" />
    </div>
  );
};

export default PaymentInfo;
