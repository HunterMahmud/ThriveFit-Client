import React from "react";

const AboutUs = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-7xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-none  dark:text-white">
              About Us
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg  dark:text-gray-400">
              <span className="font-bold text-xl">Overview: </span>
              ThriveFit Gym is a premier fitness center dedicated to transforming
              lives through innovative and comprehensive fitness solutions.
              Located in the heart of the city, ThriveFit Gym offers a diverse
              range of services designed to meet the unique needs of each
              member. Our state-of-the-art facilities, experienced trainers, and
              welcoming community make us the preferred choice for fitness
              enthusiasts of all levels.
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg  dark:text-gray-400">
            <span className="font-bold text-xl">Mission:  </span>
              Our mission is to provide a supportive and motivating
              environment where individuals can achieve their fitness goals,
              enhance their well-being, and live healthier, happier lives. We
              are committed to delivering exceptional service, personalized
              training, and a variety of fitness programs that cater to all ages
              and abilities.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://source.unsplash.com/woman-in-black-long-sleeve-shirt-and-black-pants-sitting-on-exercise-equipment-HyvE5SiKMUs"
              alt="mockup"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
