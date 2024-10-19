import React from "react";
import Sidebar from "../components/profile/Sidebar";
import Logo from "../components/profile/Logo";
import ProfileContent from "../components/profile/ProfileContent";

const Profile = () => {
  return (
    <div>
      <div className='Desktop3 w-[1440px] h-[1024px] relative bg-[#efefef]'>
        <Sidebar />
        <Logo />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;
