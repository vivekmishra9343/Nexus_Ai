import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "Tech Corp",
      text: "NexusAI has transformed our hiring process. The AI-powered matching is incredibly accurate.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Hiring Manager",
      company: "Innovation Labs",
      text: "The automated screening saved us countless hours. Best recruitment platform we've used.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className='text-4xl font-bold text-center mb-16'
        >
          What Our Clients Say
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className='bg-white p-8 rounded-2xl shadow-lg'
            >
              <FaQuoteLeft className='text-4xl text-[#ff7f7f] mb-4' />
              <p className='text-gray-600 mb-6'>{testimonial.text}</p>
              <div className='flex items-center'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='font-semibold'>{testimonial.name}</h4>
                  <p className='text-sm text-gray-500'>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
