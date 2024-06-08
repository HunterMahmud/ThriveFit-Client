import React from "react";
import MaxWidthProvider from "../../hooks/MaxWidthProvider";

const AboutUs = () => {
  return (
    <MaxWidthProvider>
      <div className="mx-auto container my-10">
        <section className=" max-w-7xl mx-auto text-gray-900">
          <h1 className=" mb-4 text-3xl sm:text-5xl font-extrabold text-center ">
            About Us
          </h1>
          <div className="mx-2 py-8 flex flex-col lg:flex-row">
            <div className="  lg:w-1/2">
              <p className=" mb-6 font-light text-gray-800 lg:mb-8 md:text-lg">
                <span className="font-bold text-xl">Overview: </span>
                ThriveFit Gym is a premier fitness center dedicated to
                transforming lives through innovative and comprehensive fitness
                solutions. Located in the heart of the city, ThriveFit Gym
                offers a diverse range of services designed to meet the unique
                needs of each member. Our state-of-the-art facilities,
                experienced trainers, and welcoming community make us the
                preferred choice for fitness enthusiasts of all levels.
              </p>
              <p className=" mb-6 font-light text-gray-800 lg:mb-8 md:text-lg">
                <span className="font-bold text-xl">Mission: </span>
                Our mission is to provide a supportive and motivating
                environment where individuals can achieve their fitness goals,
                enhance their well-being, and live healthier, happier lives. We
                are committed to delivering exceptional service, personalized
                training, and a variety of fitness programs that cater to all
                ages and abilities.
              </p>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img
                className="object-cover h-full w-full"
                src="https://i.ibb.co/2jL8m11/gym4.jpg"
                alt="mockup"
              />
            </div>
          </div>
        </section>
      </div>
    </MaxWidthProvider>
  );
};

export default AboutUs;
