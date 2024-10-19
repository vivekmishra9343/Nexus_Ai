import React from "react";
import logo from "../../assets/images/nexus ai logo.png";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  return (
    <div className='bg-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
      <div className='flex items-center space-x-2 px-4'>
        {/* Use `to` instead of `href` in Link */}
        <Link to='/'>
          <img src={logo} alt='NexusAi Logo' className='h-8 w-8' />
        </Link>
        <span className='text-2xl font-semibold'>NexusAi</span>
      </div>
      <nav>
        {/* Replace <a> tags with <Link> for navigation */}
        <Link
          to='/overview'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-green-700'
        >
          Overview
        </Link>
        <Link
          to='/profile'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Update Profile
        </Link>
        <Link
          to='/support'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Help & Support
        </Link>
        <Link
          to='/feedback'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          View Feedback
        </Link>
      </nav>
      <div className='absolute bottom-0 w-full'>
        <Link
          to='/logout'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default SidebarMenu;
