import React from "react";
import logo from "../../assets/images/nexus ai logo.png";

const SidebarMenu = () => {
  return (
    <div className=' bg-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out'>
      <div className='flex items-center space-x-2 px-4'>
        <img src={logo} alt='NexusAi Logo' className='h-8 w-8' />
        <span className='text-2xl font-semibold'>NexusAi</span>
      </div>
      <nav>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 text-green-700'
        >
          Overview
        </a>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Update Profile
        </a>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Help & Support
        </a>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          view Feedback
        </a>
      </nav>
      <div className='absolute bottom-0 w-full'>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100'
        >
          Log out
        </a>
      </div>
    </div>
  );
};

export default SidebarMenu;
