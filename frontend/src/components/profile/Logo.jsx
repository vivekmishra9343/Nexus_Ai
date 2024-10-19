import React from "react";
import logo from "../../assets/images/nexus ai logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className='Logo left-[27px] top-[26px] absolute'>
      <div className="Nexusai left-[71px] top-[10.17px] absolute text-black text-2xl font-medium font-['Lato']">
        <Link to='/'>
          <img src={logo} alt='NexusAi Logo' className='h-12 w-12' />
        </Link>
        NexusAi
      </div>
    </div>
  );
};

export default Logo;
