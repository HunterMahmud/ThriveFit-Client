import React, { useRef } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import ReviewSlide from './ReviewSlide';
// const testimonials = [
//     {
//       image: 'https://i.ibb.co/KyrxYxm/fit1.webp',
//       title: 'Clean and Safe Environment',
//       quote: 'The commitment to cleanliness and safety at ThriveFit Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym.',
//       author: 'Hardy V.'
//     },
//     {
//       image: 'https://i.ibb.co/drQRP15/jonson.jpg',
//       title: 'Personal Training',
//       quote: 'The personal training services at ThriveFit Gym are exceptional. My trainer, Alex, creates personalized workout plans that push me just the right amount. The website made it easy to find and book sessions with him.',
//       author: 'Dwayne Johnson'
//     },
//     {
//       image: 'https://i.ibb.co/nP2HjyS/roman.jpg',
//       title: 'Group Fitness Classes',
//       quote: "I love the variety of group fitness classes available at ThriveFit Gym. From yoga to HIIT, there's something for everyone. The class descriptions and schedules on the website are detailed and easy to follow.",
//       author: 'Roman R.'
//     },
//     {
//       image: 'https://i.ibb.co/7G5Shbg/cena.jpg',
//       title: 'Nutrition Counseling',
//       quote: 'ThriveFit Gym offers fantastic nutrition counseling services and their nutritionist has helped me develop a balanced diet that complements my workout routine. The information on the website about these services is very comprehensive.',
//       author: 'John Cena'
//     }
//   ];


var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Reviews = () => {
  const arrowRef = useRef(null);
  const axiosPublic = useAxiosPublic()
  const {data:testimonials, error, isloading} = useQuery({
    queryKey:['testimonials'],
    queryFn: async()=>{
        const {data} = await axiosPublic.get('/reviews')
        return data;
    }
  });
  if(isloading) return <p>loaiding</p>
  if(error) return <p>error happened</p>
  if(!testimonials || testimonials.length===0){
    return <p>data not found</p>
  } 
// console.log(testimonials);
  return (
    <div className="w-4/5 max-w-screen-xl text-gray-900 mx-auto py-10" id="client">
      <h2 className="text-gray-800 text-3xl sm:text-5xl font-extrabold mb-4 text-center">Reviews</h2>
      
      <p className="mb-10 mt-4 font-light text-center text-gray-500  sm:text-xl">
          What Client Says
        </p>
      <div className="mt-8 relative">
        <Slider ref={arrowRef} {...settings}>
          {testimonials.map((item, i) => <ReviewSlide item={item} key={i} />)}
        </Slider>
        <div className="absolute right-2 bottom-[-2rem] hidden md:flex">
          <button
            onClick={() => arrowRef.current.slickPrev()}
            className="bg-transparent border-none  cursor-pointer text-2xl"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => arrowRef.current.slickNext()}
            className="bg-transparent border-none  cursor-pointer text-2xl ml-2"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
