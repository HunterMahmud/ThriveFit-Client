import React from "react";
import personal from "../../assets/personal.png";
import nutrition from "../../assets/nutrition.png";
import community from "../../assets/community.png";
import group from "../../assets/group.png";
import equip from "../../assets/equip.png";
import expert from "../../assets/expert.png";
import MaxWidthProvider from "../../hooks/MaxWidthProvider";

const Features = () => {
  return (
  <MaxWidthProvider>
      <section className=" mx-2 text-gray-900 ">
      <div className="container mx-2  my-6 space-y-2 text-center ">
        <h2 className="text-3xl sm:text-5xl font-bold">Get A Perfect Body</h2>
        <p className="text-gray-800  max-w-[900px] mx-auto">
          Discover ThriveFit's exceptional services: personalized training
          plans, advanced equipment, vibrant group classes, and expert nutrition
          guidance. Achieve your perfect body with us!
        </p>
      </div>
      <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center text-center  border border-gray-300 rounded-md shadow-md ">
          <img className="h-24 w-24" src={personal} alt="" />

          <h3 className="my-3 text-2xl sm:text-3xl font-semibold ">
            Personalized Training
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Experience customized workout plans tailored to your fitness
              goals. Our expert trainers design programs for optimal results and
              continuous support, ensuring you achieve your desired outcomes
              efficiently and safely.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4  border border-gray-300 rounded-md shadow-md  ">
          <img className="h-24 w-24" src={equip} alt="" />
          <h3 className="my-3  text-2xl sm:text-3xl font-semibold">
            Advanced Equipment
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Train with state-of-the-art machines and tools that cater to all
              your fitness needs. Our facility offers top-notch equipment for a
              superior workout experience, enhancing your training and
              performance.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4  border border-gray-300 rounded-md shadow-md  ">
          <img className="h-24 w-24" src={group} alt="" />
          <h3 className="my-3  text-2xl sm:text-3xl font-semibold">
            Group Classes
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Engage in dynamic, instructor-led classes like yoga, HIIT, and
              Zumba. Enjoy a fun, motivating group workout that keeps you
              energized and committed to your fitness journey.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4  border border-gray-300 rounded-md shadow-md  ">
          <img className="h-24 w-24" src={nutrition} alt="" />
          <h3 className="my-3  text-2xl sm:text-3xl font-semibold">
            {" "}
            Nutrition Coaching
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Receive personalized nutrition plans and coaching to support your
              fitness goals. Our experts help you achieve and maintain a
              balanced, healthy lifestyle through tailored advice and meal
              planning.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4  border border-gray-300 rounded-md shadow-md  ">
          <img className="h-24 w-24" src={expert} alt="" />
          <h3 className="my-3  text-2xl sm:text-3xl font-semibold">
            Expert Trainers
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Work with certified professionals dedicated to your fitness
              success. Our expert trainers provide the guidance and support you
              need to reach and exceed your fitness aspirations.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center p-4  border border-gray-300 rounded-md shadow-md  ">
          <img className="h-24 w-24" src={community} alt="" />
          <h3 className="my-3  text-2xl sm:text-3xl font-semibold">
            {" "}
            Community Support
          </h3>
          <div className="space-y-1 leading-tight">
            <p>
              Become part of a motivating and supportive fitness community.
              ThriveFit encourages your progress with a positive environment,
              helping you stay committed and inspired on your fitness journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  </MaxWidthProvider>
  );
};

export default Features;
