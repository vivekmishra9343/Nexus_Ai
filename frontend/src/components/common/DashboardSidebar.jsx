import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const MenuItem = ({ icon: Icon, label, path, notifications, isActive }) => (
  <Link to={path}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-gray-600"}`}
      />
      <span
        className={`ml-3 ${
          isActive ? "text-blue-600 font-medium" : "text-gray-700"
        }`}
      >
        {label}
      </span>
      {notifications > 0 && (
        <span className='ml-auto bg-red-500 text-white rounded-full px-2 py-1 text-xs'>
          {notifications}
        </span>
      )}
    </motion.div>
  </Link>
);

const DashboardSidebar = ({ type = "candidate" }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const candidateMenuItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/candidate" },
    { icon: BriefcaseIcon, label: "Jobs", path: "/candidate/jobs" },
    {
      icon: ChatBubbleLeftIcon,
      label: "Messages",
      path: "/candidate/messages",
      notifications: 3,
    },
    { icon: CalendarIcon, label: "Interviews", path: "/candidate/interviews" },
    {
      icon: DocumentTextIcon,
      label: "Applications",
      path: "/candidate/applications",
    },
    { icon: CogIcon, label: "Settings", path: "/candidate/settings" },
  ];

  const hrMenuItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/hr" },
    { icon: UserGroupIcon, label: "Candidates", path: "/hr/candidates" },
    { icon: BriefcaseIcon, label: "Job Postings", path: "/hr/jobs" },
    {
      icon: ChatBubbleLeftIcon,
      label: "Messages",
      path: "/hr/messages",
      notifications: 5,
    },
    { icon: CalendarIcon, label: "Interviews", path: "/hr/interviews" },
    { icon: ChartBarIcon, label: "Analytics", path: "/hr/analytics" },
    { icon: CogIcon, label: "Settings", path: "/hr/settings" },
  ];

  const menuItems = type === "candidate" ? candidateMenuItems : hrMenuItems;

  return (
    <div className='w-64 bg-white h-screen shadow-lg flex flex-col'>
      <div className='p-6 border-b'>
        <h2 className='text-2xl font-bold text-gray-800'>
          {type === "candidate" ? "Candidate Portal" : "HR Portal"}
        </h2>
      </div>

      <nav className='mt-6 flex-1 overflow-y-auto'>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            isActive={currentPath === item.path}
          />
        ))}
      </nav>

      {/* Profile Section at Bottom */}
      <div className='p-4 border-t'>
        <div className='flex items-center space-x-3'>
          <img
            src='/default-avatar.png'
            alt='Profile'
            className='w-10 h-10 rounded-full'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40";
            }}
          />
          <div>
            <p className='text-sm font-medium text-gray-700'>John Doe</p>
            <p className='text-xs text-gray-500'>View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
