import React from "react";

const InputField = ({ label, type, placeholder }) => (
  <div className='mb-6'>
    <label className='block text-sm font-medium text-gray-600'>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className='mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400'
    />
  </div>
);
export default InputField;
