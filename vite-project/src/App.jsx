import React from "react";
import Navbar from "./components/home/Navbar";
import HeroSection from "./components/home/Herosection";
import CircleImage from "./components/home/CircleImage";
import CallToAction from "./components/home/CallToAction";
import BackgroundElements from "./components/home/BackgroundElements";

const App = () => {
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

export default App;
