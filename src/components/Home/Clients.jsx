import React, { useRef } from "react";
import Slider from "react-slick";
import ClientSlider from "./ClientSlider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from "react-awesome-reveal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const testimonials = [
    {
      image: 'https://i.ibb.co/KyrxYxm/fit1.webp',
      title: 'Clean and Safe Environment',
      quote: 'The commitment to cleanliness and safety at ThriveFit Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym.',
      author: 'Hardy V.'
    },
    {
      image: 'https://i.ibb.co/drQRP15/jonson.jpg',
      title: 'Personal Training',
      quote: 'The personal training services at ThriveFit Gym are exceptional. My trainer, Alex, creates personalized workout plans that push me just the right amount. The website made it easy to find and book sessions with him.',
      author: 'Dwayne Johnson'
    },
    {
      image: 'https://i.ibb.co/nP2HjyS/roman.jpg',
      title: 'Group Fitness Classes',
      quote: "I love the variety of group fitness classes available at ThriveFit Gym. From yoga to HIIT, there's something for everyone. The class descriptions and schedules on the website are detailed and easy to follow.",
      author: 'Roman R.'
    },
    {
      image: 'https://i.ibb.co/7G5Shbg/cena.jpg',
      title: 'Nutrition Counseling',
      quote: 'ThriveFit Gym offers fantastic nutrition counseling services. Working with their nutritionist has helped me develop a balanced diet that complements my workout routine. The information on the website about these services is very comprehensive.',
      author: 'John Cena'
    }
  ];
let clients = [
  {
    name: "John Michel",
    position: "web developer",
    img_url:
      "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
    stars: 3,
    disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`,
  }
  
];

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
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Clients = () => {
  const arrowRef = useRef(null);
  let clientDisc = "";
  clientDisc = testimonials.map((item, i) => <ClientSlider item={item} key={i} />);
  return (
    <div className="w-4/5 max-w-screen-xl text-gray-900 mx-auto py-16" id="client">
      <h2 className="text-gray-800 text-3xl sm:text-5xl font-extrabold text-center">Reviews</h2>
      <p className=" text-center">What clients say</p>

      <div className="mt-8 relative">
        <Slider ref={arrowRef} {...settings}>
          {clientDisc}
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

export default Clients;
