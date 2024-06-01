import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import Testi from '../../components/Home/Testi';
import Testimonials from '../../components/Home/Testimonials';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Features/>
           {/* <Testimonials/> */}
           <Testi/>
        </div>
    );
};

export default Home;