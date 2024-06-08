import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    image: 'https://i.ibb.co/KyrxYxm/fit1.webp',
    title: 'Clean and Safe Environment',
    quote: 'The commitment to cleanliness and safety at FitLife Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym.',
    author: 'Hardy V.'
  },
  {
    image: 'https://i.ibb.co/drQRP15/jonson.jpg',
    title: 'Personal Training',
    quote: 'The personal training services at FitLife Gym are exceptional. My trainer, Alex, creates personalized workout plans that push me just the right amount. The website made it easy to find and book sessions with him.',
    author: 'Dwayne Johnson'
  },
  {
    image: 'https://i.ibb.co/nP2HjyS/roman.jpg',
    title: 'Group Fitness Classes',
    quote: "I love the variety of group fitness classes available at FitLife Gym. From yoga to HIIT, there's something for everyone. The class descriptions and schedules on the website are detailed and easy to follow.",
    author: 'Roman R.'
  },
  {
    image: 'https://i.ibb.co/7G5Shbg/cena.jpg',
    title: 'Nutrition Counseling',
    quote: 'FitLife Gym offers fantastic nutrition counseling services. Working with their nutritionist has helped me develop a balanced diet that complements my workout routine. The information on the website about these services is very comprehensive.',
    author: 'John Cena'
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getSlidesToDisplay = () => {
    let slides = [];
    for (let i = 0; i < slidesToShow; i++) {
      slides.push(testimonials[(currentSlide + i) % testimonials.length]);
    }
    return slides;
  };

  return (
    <div className="w-4/5 max-w-7xl mx-auto my-8 text-gray-900">
      <h2 className="text-center text-3xl font-bold my-8">Testimonials</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500">
            {getSlidesToDisplay().map((testimonial, index) => (
              <div key={index} className="min-w-full flex-shrink-0 p-4 flex justify-center" style={{ width: `${100 / slidesToShow}%` }}>
                <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center h-full">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <p className="text-2xl font-bold text-rose-600 sm:text-3xl text-center">
                    {testimonial.title}
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 text-center">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6 text-center">
                    &mdash; {testimonial.author}
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer bg-black text-white rounded-full p-2 z-10" onClick={prevSlide}>
          <FaArrowLeft />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer bg-black text-white rounded-full p-2 z-10" onClick={nextSlide}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

/*
import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    image: 'https://i.ibb.co/KyrxYxm/fit1.webp',
    title: 'Clean and Safe',
    quote: 'The commitment to cleanliness and safety at FitLife Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym.',
    author: 'Hardy V.'
  },
  {
    image: 'https://i.ibb.co/drQRP15/jonson.jpg',
    title: 'Personal Training',
    quote: 'The personal training services at FitLife Gym are exceptional. My trainer, Alex, creates personalized workout plans that push me just the right amount. The website made it easy to find and book sessions with him.',
    author: 'Dwayne Johnson'
  },
  {
    image: 'https://i.ibb.co/nP2HjyS/roman.jpg',
    title: 'Group Fitness Classes',
    quote: "I love the variety of group fitness classes available at FitLife Gym. From yoga to HIIT, there's something for everyone. The class descriptions and schedules on the website are detailed and easy to follow.",
    author: 'Roman R.'
  },
  {
    image: 'https://i.ibb.co/7G5Shbg/cena.jpg',
    title: 'Nutrition Counseling',
    quote: 'Fantastic nutrition counseling services. Working with their nutritionist has helped me develop a balanced diet. The information on the website about these services is very comprehensive.',
    author: 'John Cena'
  }
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer bg-black text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer bg-black text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);

const Testimonials = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-4/5 max-w-7xl mx-auto my-8 text-gray-900">
      <h2 className="text-center text-3xl font-bold my-8">Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-100 text-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full">
              <div className="flex flex-col items-center flex-grow">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-2xl font-bold text-rose-600 sm:text-3xl text-center">
                  {testimonial.title}
                </p>
              </div>
              <p className="mt-4 leading-relaxed text-gray-700 text-center">
                {testimonial.quote}
              </p>
              <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6 text-center">
                &mdash; {testimonial.author}
              </footer>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;


*/

/*
--------------------------------------------------------
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { reviews } from './reviewsData';
import Quote from './../../assets/blockquote.svg';
import './testi.css'

const Testimonials = () => {
  return (
    <section className="testimonial-container max-w-7xl mx-auto w-[95%] my-[25px] text-white">
      <div className="title">
        <h2 className='text-5xl font-bold'>What People Are Saying</h2>
        
      </div>

      <div className="slider-container">
        <blockquote>
          <img className="top-quote quote" src={Quote} alt="quote" />
          <img className="bottom-quote quote" src={Quote} alt="quote" />
        </blockquote>

        <Splide
          options={{
            perPage: 1,
            autoplay: true,
            speed: 1000,
            rewind: true,
            rewindByDrag: true,
          }}
        >
          {reviews.map((review) => (
            <SplideSlide key={review.id}>
              <img className="w-[140px] h-[140px] rounded-[50%] object-cover mb-[1rem]" src={review.image} alt="" />
              <div className="content text-white">
           

                <p className="text-gray-200 mb-[1rem] text-[1.1rem]">{review.text}</p>
                <div className="info">
                  <div className="rating">
                    ratting
                  </div>
                  <p className="font-semibold">{review.name}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
*/
