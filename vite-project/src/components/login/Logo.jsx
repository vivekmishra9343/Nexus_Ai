import React from "react";
import logoImage from "../../assets/images/logo.png"; // Import the logo image

const Logo = () => (
  <div className='flex items-center'>
    <img
      src={logoImage}
      alt='NexusAi Logo'
      className='h-10 w-auto object-contain'
    />
  </div>
);

export default Logo;
