import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import useTrainerData from "./../../hooks/useTrainerData";

const packages = [
  {
    name: "Basic",
    benefits: [
      "Access to gym facilities during regular operating hours",
      "Use of cardio and strength training equipment",
      "Access to locker rooms and showers",
    ],
    price: 10,
  },
  {
    name: "Standard",
    benefits: [
      "All benefits of the basic membership",
      "Access to group fitness classes such as yoga, spinning, and Zumba",
      "Use of additional amenities like a sauna or steam room",
    ],
    price: 50,
  },
  {
    name: "Premium",
    benefits: [
      "All benefits of the standard membership",
      "Access to personal training sessions with certified trainers",
      "Discounts on additional services such as massage therapy or nutrition counseling",
    ],
    price: 100,
  },
];

const TrainerBooked = () => {
  const { trainerId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedSlot = searchParams.get("slot");

  const [trainer, isLoading] = useTrainerData({ id: trainerId });
  // console.log(trainer.slots);
  const slotInfo = trainer?.slots?.find((slot) => slot.slotName == selectedSlot);
  console.log(slotInfo);
  // console.log(selectedSlot);
  const handleJoinNow = () => {
    const pkg = packages.find((pkg) => pkg.name === selectedPackage);
    // console.log(pkg);
    navigate("/payment", {
      state: {
        trainer,
        selectedSlot,
        selectedClasses: slotInfo.selectedClasses,
        pkgName: selectedPackage,
        price: pkg.price,
      },
    });
  };

  const [selectedPackage, setSelectedPackage] = useState(null);
  //   console.log(selectedPackage);
  if (isLoading) {
    return <p>loading....</p>;
  }
  return (
    <div className="container mx-auto max-w-7xl p-4 my-10">
      {trainer ? (
        <div className="border rounded-lg p-4 shadow-md text-white">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Trainer Booking Details
          </h1>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-5">
            <div className="md:w-1/2">
              <img
                className="w-full h-full"
                src={trainer.profileImage}
                alt={trainer.profileImage}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold">
                Trainer: {trainer.fullName}
              </h2>
              <p className="my-3">
                <span className="font-semibold">Selected Slot:</span>{" "}
                {selectedSlot}
              </p>
             

              <div className="mb-4">
                <h3 className="text-xl font-semibold">Classes</h3>
                <ul className="list-disc pl-5 mt-2">
                  {slotInfo?.selectedClasses?.map((cls, index) => (
                    <li key={index}>{cls.label}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Available Days</h3>
                <ul className="list-disc pl-5 mt-2">
                  {slotInfo?.availableDays?.map((day, index) => (
                    <li key={index}>{day.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-4 mt-10">
            <h3 className="text-4xl font-bold text-center mb-2">Packages</h3>
            <p className="text-sm text-center mb-7">Select Your Package</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`border-[2px] rounded-lg p-4 shadow-md cursor-pointer  ${
                    selectedPackage === pkg.name
                      ? " border border-violet-400 bg-violet-400 text-black"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedPackage(pkg.name)}
                >
                  <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 ">
                    <p className="text-lg font-medium">{pkg.name} Membership</p>
                    <p className="text-5xl font-bold ">
                      {pkg.price}$<span className="text-xl">/mo</span>
                    </p>
                  </div>

                  <ul className=" pl-5 mt-2 ">
                    {pkg.benefits.map((benefit, idx) => (
                      <>
                        <li key={idx} className="flex justify-start space-x-2">
                          <div className="w-5 h-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </div>
                          <span> {benefit}</span>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-offset-2"
            onClick={handleJoinNow}
            disabled={!selectedPackage}
          >
            Join Now
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TrainerBooked;

/*




 */
