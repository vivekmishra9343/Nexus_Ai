import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CandidateDashboard from "./pages/CandidateDashboard"; // Import your Candidate Dashboard component

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<CandidateDashboard />} />{" "}
        {/* Route for Candidate Dashboard */}
      </Routes>
    </div>
  );
};

export default App;
