import React from "react";

const Interviews = () => {
  const interviews = [
    {
      id: 1,
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      date: "2024-03-15",
      time: "14:00",
      type: "Video Call",
      interviewer: "Sarah Johnson",
      status: "upcoming",
    },
    // Add more interviews
  ];

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Interviews</h1>
        <div className='flex space-x-4'>
          <select className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option>All Interviews</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className='space-y-4'>
        {interviews.map((interview) => (
          <div key={interview.id} className='bg-white p-6 rounded-xl shadow-sm'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-lg font-semibold'>{interview.position}</h3>
                <p className='text-gray-600'>{interview.company}</p>
                <div className='mt-4 space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Date:</span>
                    <span>{new Date(interview.date).toLocaleDateString()}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Time:</span>
                    <span>{interview.time}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Type:</span>
                    <span>{interview.type}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-gray-500'>Interviewer:</span>
                    <span>{interview.interviewer}</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col space-y-2'>
                <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                  {interview.status}
                </span>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                  Join Meeting
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interviews;
