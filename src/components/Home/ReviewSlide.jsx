import React from "react";
import { IoIosQuote } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSlide = ({ item }) => {
  // console.log(item);
  const { userName, userImage, feedback, rating } = item;
  return (
    <div className="flex flex-col justify-between bg-gradient-to-r from-gray-100 to-gray-200 p-6 m-4 rounded-lg h-[450px] sm:h-[380px] lg:h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-5xl text-blue-500 opacity-70">
          <IoIosQuote />
        </span>
      </div>
      <p className="text-sm mb-6">{feedback}</p>
      <div className="flex items-center">
        <img
          src={userImage}
          alt={userName}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col">
          <h1 className=" font-bold">{userName}</h1>
          <div>
            {[...Array(rating)].map((_, index) => (
              <span key={index} className={`text-xl text-yellow-500`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSlide;
