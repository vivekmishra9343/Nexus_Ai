import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const CallToAction = () => {
  return (
    <div className='Group158 w-[477px] h-[68.43px] left-[69px] top-[600px] absolute'>
      {/* Sign Up Button with Link */}
      <div className='Cta w-[218px] h-[68px] left-0 top-0 absolute'>
        <Link to='/signup'>
          <div className='Rectangle2 w-[218px] h-[68px] left-0 top-0 absolute bg-gradient-to-tr from-[#c4fdff] via-[#d1ebfc] to-[#fec0c3] rounded-[20px] border border-[#15191f]/30' />
          <div className="SignUp left-[52px] top-[15.43px] absolute text-black text-[32px] font-normal font-['Lato']">
            Sign Up
          </div>
        </Link>
      </div>

      {/* Login Button with Link */}
      <div className='Cta w-[218px] h-[68px] left-[259px] top-[0.43px] absolute'>
        <Link to='/login'>
          <div className='Rectangle2 w-[218px] h-[68px] left-0 top-0 absolute bg-gradient-to-tr from-[#c4fdff] via-[#d1ebfc] to-[#fec0c3] rounded-[20px] border border-[#15191f]/30' />
          <div className="Login left-[71px] top-[15px] absolute text-black text-[32px] font-normal font-['Lato']">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
