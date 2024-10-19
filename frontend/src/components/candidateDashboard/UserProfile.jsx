import React from "react";
import { LuMoreVertical } from "react-icons/lu";
import avatar from "../../assets/images/avatar.png";

const UserProfile = () => {
  return (
    <div className='bg-blue-100 w-80 p-6'>
      <div className='flex flex-col items-center'>
        <img
          src={avatar}
          alt='James Kinn'
          className='w-24 h-24 rounded-full mb-4'
        />
        <h2 className='text-2xl font-bold'>james kinn</h2>
        <p className='text-gray-600'>Middle UX/UI Designer</p>
      </div>
      <div className='mt-6'>
        <h3 className='text-xl font-semibold mb-2'>Reminders</h3>
        <div className='bg-white p-4 rounded-lg flex items-start'>
          {/* <Bell size={16} className='mr-2 mt-1' /> */}
          <div className='flex-1'>
            <p className='font-medium'>
              you have been selected for the next round
            </p>
          </div>
          <LuMoreVertical size={16} />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
