import React from "react";
import heroSectionImage from "../../assets/images/heroSectionImage.png";

const CircleImage = () => {
  return (
    <div className='Group160 w-[441px] h-[438px] left-[1000px] top-[165px] absolute'>
      <div className='Circle w-[375px] h-[438px] left-0 top-0 absolute'>
        <div className='68ef4e3b51d14fae9227913e4bc7213e w-[438px] h-[438px] left-0 top-0 absolute bg-gradient-to-tr from-[#c4fdff] via-[#d1ebfc] to-[#fec0c3] rounded-full' />
      </div>
      <img
        className='68ef4e3b51d14fae9227913e4bc7213e w-[406.59px] h-[405.84px] left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute rounded-full object-cover'
        src={heroSectionImage}
        alt='Your alt text'
      />
    </div>
  );
};

export default CircleImage;
