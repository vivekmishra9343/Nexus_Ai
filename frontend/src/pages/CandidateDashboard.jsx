import React from "react";
import SidebarMenu from "../components/candidateDashboard/SidebarMenu";
import ApppliedSection from "../components/candidateDashboard/ApppliedSection";
import ApplicationStatus from "../components/candidateDashboard/ApplicationStatus";
import InterviewStatus from "../components/candidateDashboard/InterviewStatus";
import Header from "../components/candidateDashboard/Header";
import UserProfile from "../components/candidateDashboard/UserProfile";
import Navbar from "../components/home/Navbar";

const CandidateDashboard = () => {
  return (
    <div className='flex dashboard bg-gray-100 h-[100vh]'>
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <div className='flex-1 flex'>
        <main className='flex-1 p-8'>
          <div className='bg-white rounded-3xl shadow-lg p-8'>
            <Header />

            <div className='grid grid-cols-2 gap-6 mt-6'>
              <ApplicationStatus />
              <InterviewStatus />
            </div>
            <ApppliedSection />
          </div>
        </main>

        {/* User Profile Sidebar */}
        <UserProfile />
      </div>
    </div>
  );
};

export default CandidateDashboard;
