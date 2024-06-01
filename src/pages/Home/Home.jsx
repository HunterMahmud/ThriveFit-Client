import React from 'react';
import AboutUs from '../../components/Home/AboutUs';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import NewsLetter from '../../components/Home/NewsLetter';
// import Testimonial from '../../components/Home/Testimonial';
import Testimonials from '../../components/Home/Testimonials';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Features/>
           <AboutUs/>
           {/* <Testimonials/> */}
           {/* <Testimonial/> */}
          
           <NewsLetter/>
        </div>
    );
};

export default Home;