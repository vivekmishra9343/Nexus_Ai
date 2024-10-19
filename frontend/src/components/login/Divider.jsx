import React from "react";

const Divider = ({ text }) => {
  return (
    <div className='flex items-center my-8'>
      <div className='flex-grow border-t border-gray-300'></div>
      <span className='flex-shrink mx-4 text-gray-500'>{text}</span>
      <div className='flex-grow border-t border-gray-300'></div>
    </div>
  );
};

export default Divider;
