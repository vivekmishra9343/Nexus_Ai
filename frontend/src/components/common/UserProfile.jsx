import React from "react";

const UserProfile = () => {
  return (
    <div className='w-64 bg-white border-l p-4'>
      <div className='flex flex-col items-center'>
        <img
          src='/default-avatar.png'
          alt='Profile'
          className='w-20 h-20 rounded-full'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/80";
          }}
        />
        <h3 className='mt-4 font-semibold'>John Doe</h3>
        <p className='text-sm text-gray-500'>HR Manager</p>
      </div>
    </div>
  );
};

export default UserProfile;
