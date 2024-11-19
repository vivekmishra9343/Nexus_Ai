import React from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "../../components/common/DashboardSidebar";
import ApppliedSection from "../../components/candidateDashboard/ApppliedSection";
import ApplicationStatus from "../../components/candidateDashboard/ApplicationStatus";
import InterviewStatus from "../../components/candidateDashboard/InterviewStatus";
import Header from "../../components/candidateDashboard/Header";
import UserProfile from "../../components/candidateDashboard/UserProfile";
import Jobs from "./Jobs";

const CandidateDashboard = () => {
  return (
    <div className='flex dashboard bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
      <DashboardSidebar type='candidate' />

      {/* Main Content */}
      <div className='flex-1 flex overflow-hidden mt-[-8]'>
        <main className='flex-1 p-8 overflow-y-auto py-0'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-3xl shadow-lg p-8'
          >
            <Header />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ApplicationStatus />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <InterviewStatus />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ApppliedSection />
            </motion.div>
          </motion.div>
        </main>

        {/* User Profile Sidebar */}
        <UserProfile />
      </div>
    </div>
  );
};

export default CandidateDashboard;
