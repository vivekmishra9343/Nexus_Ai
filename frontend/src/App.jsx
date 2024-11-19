import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardSidebar from "./components/common/DashboardSidebar";

// Landing Page
import Home from "./pages/landingPage/Home";
import JobDescription from "./pages/jobDescription/JobDescription";
// import JobListing from "./pages/";
import Profile from "./pages/profile/Profile";

// Import Candidate Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Jobs from "./pages/candidate/Jobs";
import Messages from "./pages/candidate/Messages";
import Interviews from "./pages/candidate/Interviews";
import Applications from "./pages/candidate/Applications";
import Settings from "./pages/candidate/Settings";

// Import HR Pages
import HRDashboard from "./pages/hr/HRDashboard";
import Candidates from "./pages/hr/Candidates";
import JobPostings from "./pages/hr/JobPostings";
import HRMessages from "./pages/hr/Messages";
import HRInterviews from "./pages/hr/Interviews";
import Analytics from "./pages/hr/Analytics";
import HRSettings from "./pages/hr/Settings";

// Import Authentication Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// Layout Components
const DashboardLayout = ({ children, userType }) => {
  return (
    <div className='flex h-screen bg-gray-100'>
      <DashboardSidebar type={userType} />
      <main className='flex-1 overflow-auto'>
        <div className='container mx-auto px-4 py-8'>{children}</div>
      </main>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {children}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path='/' element={<Navigate to='/home' replace />} />

      {/* Public Routes */}
      <Route path='/home' element={<Home />} />
      {/* <Route path='/job/:id' element={<JobDescription />} /> */}
      <Route path='/jobs' element={<JobDescription />} />
      <Route
        path='/profile'
        element={
          <DashboardLayout userType='candidate'>
            <Profile />
          </DashboardLayout>
        }
      />

      {/* Auth Routes */}
      <Route
        path='/login'
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path='/signup'
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />

      {/* Candidate Routes */}
      <Route
        path='/candidate'
        element={
          <DashboardLayout userType='candidate'>
            <CandidateDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path='/candidate/jobs'
        element={
          <DashboardLayout userType='candidate'>
            <Jobs />
          </DashboardLayout>
        }
      />
      <Route
        path='/candidate/messages'
        element={
          <DashboardLayout userType='candidate'>
            <Messages />
          </DashboardLayout>
        }
      />
      <Route
        path='/candidate/interviews'
        element={
          <DashboardLayout userType='candidate'>
            <Interviews />
          </DashboardLayout>
        }
      />
      <Route
        path='/candidate/applications'
        element={
          <DashboardLayout userType='candidate'>
            <Applications />
          </DashboardLayout>
        }
      />
      <Route
        path='/candidate/settings'
        element={
          <DashboardLayout userType='candidate'>
            <Settings />
          </DashboardLayout>
        }
      />

      {/* HR Routes */}
      <Route
        path='/hr'
        element={
          <DashboardLayout userType='hr'>
            <HRDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/candidates'
        element={
          <DashboardLayout userType='hr'>
            <Candidates />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/jobs'
        element={
          <DashboardLayout userType='hr'>
            <JobPostings />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/messages'
        element={
          <DashboardLayout userType='hr'>
            <HRMessages />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/interviews'
        element={
          <DashboardLayout userType='hr'>
            <HRInterviews />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/analytics'
        element={
          <DashboardLayout userType='hr'>
            <Analytics />
          </DashboardLayout>
        }
      />
      <Route
        path='/hr/settings'
        element={
          <DashboardLayout userType='hr'>
            <HRSettings />
          </DashboardLayout>
        }
      />

      {/* 404 Route */}
      <Route
        path='*'
        element={
          <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='text-center'>
              <h1 className='text-6xl font-bold text-gray-900'>404</h1>
              <p className='text-xl text-gray-600 mt-4'>Page not found</p>
              <button
                onClick={() => window.history.back()}
                className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
              >
                Go Back
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
