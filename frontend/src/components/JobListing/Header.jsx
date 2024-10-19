import React, { useState } from "react"; // Import useState for managing state
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  // State to track the active button
  const [activeButton, setActiveButton] = useState("Dashboard");

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update the active button state
  };

  return (
    <header className='bg-[#667bc6]/75 h-[103px] flex items-center justify-between px-8'>
      <div className='flex items-center'>
        <Link to='/'>
          <img
            src={Logo}
            alt='NexusAi Logo'
            className='w-[66px] h-[73.96px] mr-4'
          />
        </Link>
        <span className='text-black text-2xl font-medium'>NexusAi</span>
      </div>
      <nav className='flex items-center'>
        <div className='w-[72px] h-[58px] bg-white rounded-full flex items-center justify-center mr-4'>
          <IoMdNotificationsOutline className='text-[#15191f] text-3xl' />
        </div>

        <Link to='/dashboard'>
          <button
            onClick={() => handleButtonClick("Dashboard")}
            className={`text-white px-4 py-2 rounded-[20px] border-2 border-[#c4fdff] mr-4 ${
              activeButton === "Dashboard"
                ? "bg-[#15191f]"
                : "bg-[#f0f0f0] text-black" // Light gray background for inactive button
            }`}
          >
            Dashboard
          </button>
        </Link>

        <Link to='/job-listing'>
          <button
            onClick={() => handleButtonClick("Job Listing")}
            className={`text-black px-4 py-2 rounded-[20px] border border-black mr-4 ${
              activeButton === "Job Listing"
                ? "bg-[#15191f] text-white"
                : "bg-[#f0f0f0] text-black" // Light gray background for inactive button
            }`}
          >
            Job Listing
          </button>
        </Link>

        <Link to='/profile'>
          <button
            onClick={() => handleButtonClick("Profile")}
            className={`text-black px-4 py-2 rounded-[20px] border-2 border-[#c4fdff] ${
              activeButton === "Profile"
                ? "bg-[#15191f]"
                : "bg-[#f0f0f0] text-black" // Light gray background for inactive button
            }`}
          >
            Profile
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
