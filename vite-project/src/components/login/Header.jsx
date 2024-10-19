import React from "react";
import logoImage from "../../assets/images/logo.png"; // Import the logo image

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 border-b border-gray-200'>
      {/* Logo Image */}
      <div className='flex items-center'>
        <img src={logoImage} alt='Company Logo' className='h-10' />
      </div>

      <div className='flex items-center space-x-4'>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Search'
          className='px-3 py-1 bg-gray-100 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-gray-400'
        />

        {/* Language Select Dropdown */}
        <select className='text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none'>
          <option>English (United States)</option>
          {/* Add more languages as options if needed */}
        </select>

        {/* Log in Button */}
        <button className='bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 focus:outline-none'>
          Log in
        </button>
      </div>
    </header>
  );
};

export default Header;
