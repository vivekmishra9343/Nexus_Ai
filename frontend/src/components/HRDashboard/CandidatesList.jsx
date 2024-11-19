import React from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const CandidateCard = ({ candidate, onScheduleMeeting }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className='bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4'
  >
    <div className='grid grid-cols-12 gap-4 items-center'>
      {/* Profile Image & Name */}
      <div className='col-span-3 flex items-center space-x-3'>
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className='w-12 h-12 rounded-full object-cover'
        />
        <div>
          <h3 className='font-medium text-gray-900'>{candidate.name}</h3>
          <p className='text-sm text-gray-500'>{candidate.role}</p>
        </div>
      </div>

      {/* Application Details */}
      <div className='col-span-2 text-sm text-gray-600'>
        <p>ID: {candidate.applicationId}</p>
        <p className='text-xs'>{candidate.appliedDate}</p>
      </div>

      {/* Status */}
      <div className='col-span-2'>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            candidate.status === "Shortlisted"
              ? "bg-green-100 text-green-800"
              : candidate.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {candidate.status}
        </span>
      </div>

      {/* Contact Info */}
      <div className='col-span-3 flex space-x-4 text-sm text-gray-600'>
        <a href={`mailto:${candidate.email}`} className='flex items-center'>
          <EnvelopeIcon className='w-4 h-4 mr-1' />
          {candidate.email}
        </a>
        <a href={`tel:${candidate.phone}`} className='flex items-center'>
          <PhoneIcon className='w-4 h-4 mr-1' />
          {candidate.phone}
        </a>
      </div>

      {/* Actions */}
      <div className='col-span-2 flex justify-end space-x-2'>
        <button
          onClick={() => onScheduleMeeting(candidate)}
          className='flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100'
        >
          <CalendarIcon className='w-4 h-4 mr-1' />
          Schedule
        </button>
        <button
          onClick={() => onScheduleMeeting(candidate, true)}
          className='flex items-center px-3 py-1 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100'
        >
          <VideoCameraIcon className='w-4 h-4 mr-1' />
          Meet Now
        </button>
      </div>
    </div>
  </motion.div>
);

const CandidatesList = () => {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer",
      applicationId: "APP001",
      status: "Shortlisted",
      email: "sarah.j@example.com",
      phone: "+1234567890",
      appliedDate: "2024-03-15",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    // Add more candidates as needed
  ];

  const handleScheduleMeeting = (candidate, immediate = false) => {
    if (immediate) {
      // Logic for immediate meeting
      console.log(`Starting immediate meeting with ${candidate.name}`);
    } else {
      // Logic for scheduling meeting
      console.log(`Scheduling meeting with ${candidate.name}`);
    }
  };

  return (
    <div className='bg-white rounded-xl p-6 shadow-sm'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>Candidates</h2>
        <div className='flex space-x-2'>
          <select className='text-sm border rounded-md px-3 py-1'>
            <option>Filter by Status</option>
            <option>Shortlisted</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
          <input
            type='search'
            placeholder='Search candidates...'
            className='text-sm border rounded-md px-3 py-1'
          />
        </div>
      </div>

      <div className='space-y-4'>
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onScheduleMeeting={handleScheduleMeeting}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidatesList;
