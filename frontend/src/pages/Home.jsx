import React from "react";
import BackgroundElements from "../components/home/BackgroundElements";
import CircleImage from "../components/home/CircleImage";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/Herosection";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  return (
    <div className='Home2  w-full h-[1024px] relative bg-[#fbfaf4]'>
      <BackgroundElements />
      <CircleImage />
      <Navbar />
      <HeroSection />
      <CallToAction />
    </div>
  );
};

export default Home;
