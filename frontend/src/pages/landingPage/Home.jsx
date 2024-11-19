import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BackgroundElements from "../../components/home/BackgroundElements";
import CircleImage from "../../components/home/CircleImage";
import Navbar from "../../components/home/Navbar";
import HeroSection from "../../components/home/Herosection";
import CallToAction from "../../components/home/CallToAction";
import Features from "../../components/home/Features";
import Testimonials from "../../components/home/Testimonials";
import Statistics from "../../components/home/Statistics";
import Footer from "../../components/home/Footer";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className='min-h-screen overflow-x-hidden bg-gradient-to-b from-[#fbfaf4] to-white'>
      {/* Background Elements */}
      <motion.div style={{ opacity }} className='fixed inset-0 z-0'>
        <BackgroundElements />
      </motion.div>

      {/* Main Content */}
      <div className='relative z-10'>
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className='sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100'
        >
          <Navbar />
        </motion.header>

        {/* Hero Section */}
        <section className='container mx-auto px-4 pt-20 lg:pt-32 mb-32'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroSection />
              <CallToAction />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className='hidden lg:block'
            >
              <CircleImage />
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <Statistics />

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
