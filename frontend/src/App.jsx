import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CandidateDashboard from "./pages/CandidateDashboard"; // Import your Candidate Dashboard component
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import JobDescription from "./pages/JobDescription";
import JobListing from "./pages/JobDescription";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<HRDashboard />} />{" "}
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Job-listing' element={<JobListing />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        {/* Route for Candidate Dashboard */}
      </Routes>
    </div>
  );
};

export default App;
