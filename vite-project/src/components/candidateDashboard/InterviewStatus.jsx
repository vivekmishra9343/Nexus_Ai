import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const InterviewStatus = () => {
  return (
    <div className='bg-green-100 p-6 rounded-xl'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>CLICK FOR INTERVIEW</h2>
        <FaChevronRight size={24} />
      </div>
      <p className='text-sm text-gray-600 mb-4'>
        CLICK HERE TO TAKE THE INTERVIEW
      </p>
      <div className='flex items-center'>
        <span className='text-xs mr-2'>In Progress</span>
        <div className='flex-1 bg-gray-200 rounded-full h-2'>
          <div
            className='bg-yellow-400 h-2 rounded-full'
            style={{ width: "34%" }}
          ></div>
        </div>
        <span className='text-xs ml-2'>34%</span>
      </div>
    </div>
  );
};

export default InterviewStatus;
