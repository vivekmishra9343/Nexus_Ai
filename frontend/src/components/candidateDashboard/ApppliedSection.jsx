import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const ApppliedSection = () => {
  const applications = [
    {
      course: "Basics of Mobile UX",
      instructor: "Bruno Scott",
      date: "Feb 12",
      status: "PENDING",
    },
    {
      course: "Digital Design System",
      instructor: "Bruno Scott",
      date: "Feb 14",
      status: "PENDING",
    },
    {
      course: "Basics of Mobile UX",
      instructor: "Bruno Scott",
      date: "Feb 16",
      status: "PENDING",
    },
    {
      course: "amazon summer int....",
      instructor: "Bruno Scott",
      date: "Feb 18",
      status: "PENDING",
    },
  ];

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Applied Applications</h2>
        <a href='#' className='text-yellow-500 font-semibold flex items-center'>
          View all <FaChevronRight size={20} />
        </a>
      </div>
      <table className='w-full'>
        <thead>
          <tr className='text-left text-gray-500'>
            <th className='pb-2'>Posts</th>
            <th className='pb-2'>Applied on</th>
            <th className='pb-2'>result status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index} className='border-t'>
              <td className='py-4'>
                <div className='font-semibold'>{app.course}</div>
                <div className='text-sm text-gray-500'>{app.instructor}</div>
              </td>
              <td className='py-4'>{app.date}</td>
              <td className='py-4'>
                <span className='bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApppliedSection;
