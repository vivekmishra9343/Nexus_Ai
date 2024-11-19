import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const UserProfile = () => {
  const hrInfo = {
    name: "Emily Rodriguez",
    role: "Senior HR Manager",
    department: "Talent Acquisition",
    email: "emily.r@company.com",
    phone: "+1 (555) 123-4567",
    officeHours: "9:00 AM - 5:00 PM EST",
    company: "Tech Innovations Inc.",
    stats: {
      activeRecruitments: 12,
      pendingApplications: 45,
      scheduledInterviews: 8,
      completedHires: 124,
    },
  };

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      className='w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto'
    >
      {/* Profile Header */}
      <div className='text-center mb-6'>
        <img
          src='https://randomuser.me/api/portraits/women/45.jpg'
          alt='Profile'
          className='w-24 h-24 rounded-full mx-auto mb-4'
        />
        <h2 className='text-xl font-semibold text-gray-800'>{hrInfo.name}</h2>
        <p className='text-gray-600'>{hrInfo.role}</p>
      </div>

      {/* HR Information */}
      <div className='space-y-4'>
        <div className='flex items-center space-x-3 text-gray-600'>
          <BuildingOfficeIcon className='w-5 h-5' />
          <span>{hrInfo.company}</span>
        </div>
        <div className='flex items-center space-x-3 text-gray-600'>
          <BriefcaseIcon className='w-5 h-5' />
          <span>{hrInfo.department}</span>
        </div>
        <div className='flex items-center space-x-3 text-gray-600'>
          <EnvelopeIcon className='w-5 h-5' />
          <span>{hrInfo.email}</span>
        </div>
        <div className='flex items-center space-x-3 text-gray-600'>
          <PhoneIcon className='w-5 h-5' />
          <span>{hrInfo.phone}</span>
        </div>
        <div className='flex items-center space-x-3 text-gray-600'>
          <ClockIcon className='w-5 h-5' />
          <span>{hrInfo.officeHours}</span>
        </div>
      </div>

      {/* HR Stats */}
      <div className='mt-8'>
        <h3 className='text-lg font-medium text-gray-800 mb-4'>
          Recruitment Stats
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-blue-50 p-3 rounded-lg'>
            <p className='text-sm text-gray-600'>Active Recruitments</p>
            <p className='text-xl font-semibold text-blue-600'>
              {hrInfo.stats.activeRecruitments}
            </p>
          </div>
          <div className='bg-green-50 p-3 rounded-lg'>
            <p className='text-sm text-gray-600'>Pending Applications</p>
            <p className='text-xl font-semibold text-green-600'>
              {hrInfo.stats.pendingApplications}
            </p>
          </div>
          <div className='bg-purple-50 p-3 rounded-lg'>
            <p className='text-sm text-gray-600'>Scheduled Interviews</p>
            <p className='text-xl font-semibold text-purple-600'>
              {hrInfo.stats.scheduledInterviews}
            </p>
          </div>
          <div className='bg-orange-50 p-3 rounded-lg'>
            <p className='text-sm text-gray-600'>Completed Hires</p>
            <p className='text-xl font-semibold text-orange-600'>
              {hrInfo.stats.completedHires}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='mt-8'>
        <button className='w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors'>
          View Calendar
        </button>
      </div>
    </motion.div>
  );
};

export default UserProfile;
