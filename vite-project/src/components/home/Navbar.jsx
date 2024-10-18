import React from "react";
import nexusLogo from "../../assets/images/nexus ai logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='Group157 w-[1358px] h-[58.13px] left-[60px] top-[29px] absolute'>
      <div className='Rectangle2 w-[152px] h-14 left-[1031px] top-[1px] absolute bg-[#15191f] rounded-[20px] border-2 border-[#c4fdff]' />
      <div className="JobListing w-[119px] h-[30px] left-[1053px] top-[16px] absolute text-white text-2xl font-normal font-['Lato']">
        Job Listing
      </div>
      <div className='Logo w-40 h-[53.30px] left-0 top-[4.83px] absolute'>
        <img
          src={nexusLogo}
          alt='NexusAi Logo'
          className='w-[50px] h-[50px] absolute left-0 top-0'
        />
        <div className="Nexusai left-[60px] top-[10.17px] absolute text-black text-2xl font-medium font-['Lato']">
          NexusAi
        </div>
      </div>
      <div className='Cta w-[152px] h-14 left-[1206px] top-[1px] absolute'>
        <div className='Rectangle2 w-[152px] h-14 left-0 top-0 absolute bg-[#15191f] rounded-[20px] border-2 border-[#c4fdff]' />
        <div className="Profile w-[77px] h-[30px] left-[44px] top-[15px] absolute text-white text-2xl font-normal font-['Lato']">
          Profile
        </div>
      </div>
      <div className='Ellipse2 w-[72px] h-[58px] left-[763px] top-0 absolute bg-white rounded-full flex items-center justify-center'>
        <IoMdNotificationsOutline className='text-[#15191f] text-3xl' />{" "}
        {/* Adjust the icon size as needed */}
      </div>
      <div className='VuesaxLinearNotification w-12 h-[38.67px] left-[775px] top-[9.67px] absolute'>
        <div className='Notification w-12 h-[38.67px] left-0 top-0 absolute'></div>
        <div className='Ellipse3 w-2 h-2 left-[16.83px] top-[2.83px] absolute bg-[#ffd700] rounded-full' />
      </div>
      <div className='Rectangle2 w-[152px] h-14 left-[857px] top-[1px] absolute bg-[#15191f] rounded-[20px] border-2 border-[#c4fdff]' />
      <div className="Dashboard w-[130px] h-7 left-[871px] top-[16px] absolute text-white text-2xl font-normal font-['Lato']">
        Dashboard
      </div>
    </div>
  );
};

export default Navbar;
