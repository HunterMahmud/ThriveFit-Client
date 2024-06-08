import React from "react";
import { IoIosQuote } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientSlider = ({ item }) => {
  const { author, image, quote } = item;
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 m-4 rounded-lg h-[450px] sm:h-[380px] lg:h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-5xl text-blue-500 opacity-70">
          <IoIosQuote />
        </span>
      </div>
      <p className="text-sm mb-6">{quote}</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={author}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="details">
          <h1 className="text-xl font-bold">{author}</h1>
        </div>
      </div>
    </div>
  );
};

export default ClientSlider;
