import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css"; // Import KeenSlider CSS
import { useKeenSlider } from "keen-slider/react";

const Testimonials = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free",
    breakpoints: {
      "(min-width: 700px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <section className="bg-gray-50">
      <div className="mx-auto px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
          <h2 className=" text-3xl sm:text-5xl mx-auto font-bold tracking-tight text-gray-900 text-center ">
            Trusted Reviews <br /> From Our Customers
          </h2>
        </div>

        <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                <div>
                  <div className="flex gap-0.5 text-green-500">
               

                   <img className="h-[100px] w-[100px] rounded-full" src={'https://i.ibb.co/KyrxYxm/fit1.webp'} alt="" />
                   

                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                    Clean and Safe Environment

                    </p>

                    <p className="mt-4 leading-relaxed text-gray-700">
                    "The commitment to cleanliness and safety at FitLife Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym."
                    </p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                  &mdash; Hardy V.
                </footer>
              </blockquote>
            </div>
            <div className="keen-slider__slide">
              <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                <div>
                  <div className="flex gap-0.5 text-green-500">
                  <img className="h-[100px] w-[100px] rounded-full" src={'https://i.ibb.co/drQRP15/jonson.jpg'} alt="" />
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                    Personal Training
                    </p>

                    <p className="mt-4 leading-relaxed text-gray-700">
                    "The personal training services at FitLife Gym are exceptional. My trainer, Alex, creates personalized workout plans that push me just the right amount. The website made it easy to find and book sessions with him."
                    </p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                  &mdash; Dwayne Johnson
                </footer>
              </blockquote>
            </div>
            <div className="keen-slider__slide">
              <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                <div>
                  <div className="flex gap-0.5 text-green-500">
                  <img className="h-[100px] w-[100px] rounded-full" src={'https://i.ibb.co/nP2HjyS/roman.jpg'} alt="" />
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                    Group Fitness Classes

                    </p>

                    <p className="mt-4 leading-relaxed text-gray-700">
                    "I love the variety of group fitness classes available at FitLife Gym. From yoga to HIIT, there's something for everyone. The class descriptions and schedules on the website are detailed and easy to follow." 
                    </p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                  &mdash; Roman R.
                </footer>
              </blockquote>
            </div>
            <div className="keen-slider__slide">
              <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                <div>
                  <div className="flex gap-0.5 text-green-500">
                  <img className="h-[100px] w-[100px] rounded-full" src={'https://i.ibb.co/7G5Shbg/cena.jpg'} alt="" />
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                    Nutrition Counseling

                    </p>

                    <p className="mt-4 leading-relaxed text-gray-700">
                    "FitLife Gym offers fantastic nutrition counseling services. Working with their nutritionist has helped me develop a balanced diet that complements my workout routine. The information on the website about these services is very comprehensive." 
                    </p>
                  </div>
                </div>

                <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                  &mdash; John Cena
                </footer>
              </blockquote>
            </div>
            
            

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
