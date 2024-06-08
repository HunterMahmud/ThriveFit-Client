import React from "react";
import AboutUs from "../../components/Home/AboutUs";
import Banner from "../../components/Home/Banner";
import Clients from "../../components/Home/Clients";
import FeaturedClasses from "../../components/Home/FeaturedClasses";
import Features from "../../components/Home/Features";
import LatestPosts from "../../components/Home/LatestPosts";
import NewsLetter from "../../components/Home/NewsLetter";
import TeamSection from "../../components/Home/TeamSection";
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
      {/* <Testimonials /> */}
      <FeaturedClasses />
      <Clients/>
      <LatestPosts/>
      <NewsLetter />
      <TeamSection/>
    </div>
  );
};

export default Home;
