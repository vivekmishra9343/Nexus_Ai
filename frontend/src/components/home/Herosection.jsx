import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className='space-y-6 max-w-2xl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[#ff7f7f] text-4xl lg:text-5xl font-medium font-['Nunito']"
      >
        Explore the Future of Recruitment
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[#15191f] text-4xl lg:text-6xl font-bold font-['Lato'] leading-tight"
      >
        Revolutionizing Recruitment with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-black text-xl lg:text-2xl font-normal font-['Nunito'] leading-relaxed"
      >
        Welcome to TalentAI Nexus, an AI-driven platform that is transforming
        the way companies find and hire top talent
      </motion.p>
    </div>
  );
};

export default HeroSection;
