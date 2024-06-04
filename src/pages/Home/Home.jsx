import React from "react";
import AboutUs from "../../components/Home/AboutUs";
import Banner from "../../components/Home/Banner";
import Features from "../../components/Home/Features";
import NewsLetter from "../../components/Home/NewsLetter";
import Testimonials from "../../components/Home/Testimonials";
import MaxWidthProvider from "./../../hooks/MaxWidthProvider";

const Home = () => {
  return (
    <div>
      <Banner />
      <MaxWidthProvider>
        <Features />
      </MaxWidthProvider>
      <AboutUs />
      <Testimonials/>

      <NewsLetter />
    </div>
  );
};

export default Home;
