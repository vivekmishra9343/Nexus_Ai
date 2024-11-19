import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-[#15191f] text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>NexusAI</h3>
            <p className='text-gray-400'>
              Revolutionizing recruitment through AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='/about' className='text-gray-400 hover:text-white'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/features' className='text-gray-400 hover:text-white'>
                  Features
                </Link>
              </li>
              <li>
                <Link to='/pricing' className='text-gray-400 hover:text-white'>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='/help' className='text-gray-400 hover:text-white'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-400 hover:text-white'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-400 hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Connect With Us</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white text-2xl'>
                <FaLinkedin />
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-2xl'>
                <FaTwitter />
              </a>
              <a href='#' className='text-gray-400 hover:text-white text-2xl'>
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; {new Date().getFullYear()} NexusAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
