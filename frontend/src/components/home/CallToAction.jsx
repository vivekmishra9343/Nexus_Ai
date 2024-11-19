import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-4 mt-8'>
      <Link to='/signup' className='flex-1'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-8 py-4 bg-gradient-to-tr from-[#c4fdff] via-[#d1ebfc] to-[#fec0c3] rounded-[20px] border border-[#15191f]/30 text-black text-xl font-normal font-['Lato'] transition-all duration-300 hover:shadow-lg"
        >
          Sign Up
        </motion.button>
      </Link>

      <Link to='/login' className='flex-1'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-8 py-4 bg-gradient-to-tr from-[#c4fdff] via-[#d1ebfc] to-[#fec0c3] rounded-[20px] border border-[#15191f]/30 text-black text-xl font-normal font-['Lato'] transition-all duration-300 hover:shadow-lg"
        >
          Login
        </motion.button>
      </Link>
    </div>
  );
};

export default CallToAction;
