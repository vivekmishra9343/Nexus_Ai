import React from "react";
import { motion } from "framer-motion";
import { BellIcon } from "@heroicons/react/24/outline";

import StatSection from "../../components/HRDashboard/StatSection";
import MeetingLinkInput from "../../components/HRDashboard/MeetingLinkInput";
import UserProfile from "../../components/common/UserProfile";
import CandidatesList from "../../components/HRDashboard/CandidatesList";
import Header from "../../components/common/Header";

const NotificationBell = ({ count }) => (
  <motion.div whileHover={{ scale: 1.05 }} className='relative cursor-pointer'>
    <BellIcon className='w-6 h-6 text-gray-600' />
    {count > 0 && (
      <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
        {count}
      </span>
    )}
  </motion.div>
);

const HRDashboard = () => (
  <div className='flex-grow'>
    <div className='flex justify-between items-center mb-8'>
      <Header />
      <NotificationBell count={3} />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'
    >
      <StatSection />
      <MeetingLinkInput />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <CandidatesList />
    </motion.div>

    <UserProfile />
  </div>
);

export default HRDashboard;
