import React from "react";
import AboutUs from "../../components/Home/AboutUs";
import Banner from "../../components/Home/Banner";
import FeaturedClasses from "../../components/Home/FeaturedClasses";
import Features from "../../components/Home/Features";
import LatestPosts from "../../components/Home/LatestPosts";
import NewsLetter from "../../components/Home/NewsLetter";
import TeamSection from "../../components/Home/TeamSection";
import MaxWidthProvider from "./../../hooks/MaxWidthProvider";
import { Helmet } from "react-helmet-async";
import Reviews from "../../components/Home/Reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ThriveFit | Home</title>
      </Helmet>
      <Banner />
      <MaxWidthProvider>
        <Features />
      </MaxWidthProvider>
      <AboutUs />
      <FeaturedClasses />
      <Reviews />
      <LatestPosts />
      <NewsLetter />
      <TeamSection />
    </div>
  );
};

export default Home;
