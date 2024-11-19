import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Statistics = () => {
  const stats = [
    { number: 1000, label: "Companies", suffix: "+" },
    { number: 50000, label: "Candidates", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 24, label: "Hour Support", suffix: "/7" },
  ];

  return (
    <section className='py-20 bg-[#15191f] text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className='text-center'
            >
              <div className='text-4xl md:text-5xl font-bold mb-2'>
                <CountUp end={stat.number} duration={2.5} />
                {stat.suffix}
              </div>
              <div className='text-gray-400'>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
