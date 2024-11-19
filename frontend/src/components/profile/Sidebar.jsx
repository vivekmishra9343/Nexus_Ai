import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaQuestionCircle,
  FaComments,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

const MenuItem = ({ icon: Icon, text, isActive, onClick, to }) => (
  <Link to={to}>
    <motion.div
      className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer transition-all
        ${isActive ? "bg-[#3c652f] text-white" : "hover:bg-gray-100"}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className='w-6 h-6 mr-4' />
      <span className="font-['Poppins'] font-medium">{text}</span>
    </motion.div>
  </Link>
);

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Overview");

  const menuItems = [
    { icon: FaHome, text: "Overview", to: "/" },
    { icon: FaUser, text: "Update Profile", to: "/profile" },
    { icon: FaQuestionCircle, text: "Help & Support", to: "/support" },
    { icon: FaComments, text: "View Feedback", to: "/feedback" },
  ];

  return (
    <motion.div
      className='w-[250px] h-[706px] p-6 bg-white rounded-2xl shadow-lg fixed left-8 top-[240px]'
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className='space-y-6'>
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            icon={item.icon}
            text={item.text}
            isActive={activeItem === item.text}
            onClick={() => setActiveItem(item.text)}
            to={item.to}
          />
        ))}
      </div>

      {/* Logout Section */}
      <motion.div
        className='absolute bottom-8 w-full left-0 px-6'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to='/logout'>
          <div className='flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-all'>
            <FaSignOutAlt className='w-6 h-6 mr-4' />
            <span className="font-['Poppins'] font-medium">Log out</span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
