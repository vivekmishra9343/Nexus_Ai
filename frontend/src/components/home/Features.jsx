import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaChartLine } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaRobot className='text-4xl text-blue-500' />,
      title: "AI-Powered Matching",
      description:
        "Smart algorithms that connect the right talent with the right opportunities.",
    },
    {
      icon: <FaBolt className='text-4xl text-yellow-500' />,
      title: "Instant Screening",
      description:
        "Automated resume screening that saves time and reduces bias.",
    },
    {
      icon: <FaChartLine className='text-4xl text-green-500' />,
      title: "Data-Driven Insights",
      description:
        "Make informed decisions with comprehensive analytics and reporting.",
    },
  ];

  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className='text-4xl font-bold text-center mb-16'
        >
          Our Features
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className='p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <div className='mb-6'>{feature.icon}</div>
              <h3 className='text-2xl font-semibold mb-4'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
