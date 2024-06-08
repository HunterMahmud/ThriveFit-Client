import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";



const Banner = () => {
  return (
    <div className="relative">
      <div
        data-aos="fade-up"
        className="absolute  top-[30%] sm:top-[40%] left-12 md:left-20 w-[70%]  z-10"
      >
        <div className=" h-[40%] max-w-[900px] text-white p-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl  uppercase font-Bebas font-extrabold">
            {" "}
            Keep Your Body <br /> Fit {'&'} <span className="text-blue-500">
             Strong
            </span>
          </h1>
          <p className="max-w-[500px] mt-5 hidden sm:block"> Achieve peak fitness with expert training, personalized workouts, and a supportive community for all fitness levels. Join us today!</p>
          <div className="flex gap-3">
           
            <Link
              to="/classes"
              className=" mt-3 p-2 border font-bugrasimo border-blue-600 bg-violet-600 font-bold rounded-md text-lg"
            >
               Find Now!
            </Link>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        


        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co/nmJZ8Bm/gym1.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co/ZGXbtDQ/gym2.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co/yhZrkMT/gym3.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        
        
        
      </Swiper>
    </div>
  );
};

export default Banner;