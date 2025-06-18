import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/logo1.png';
import { FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-cyan-800 text-lime-400 py-8 px-6 md:px-16 w-full">
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Logo and Intro */}
        <section className="flex flex-col md:w-1/3">
          <Link to="/" className="flex items-center gap-4 hover:scale-105 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-lime-400">
            <img src={Image} alt="ReadySetHire logo" width={75} height={75} />
            <div>
              <h1 className="text-2xl font-semibold">ReadySetHire</h1>
              <p className="text-sm text-lime-300">Clear steps toward success</p>
            </div>
          </Link>
          <div className="mt-4 text-sm text-lime-200 space-y-1">
            <p>Mock interview scheduling app</p>
            <p>where students can schedule interviews</p>
            <p>and view completed & upcoming sessions.</p>
          </div>
        </section>

        {/* Quick Links */}
        <ul className="flex flex-col gap-2 md:w-1/4">
          <li className="text-xl font-semibold mb-2">Quick Links</li>
          <li><Link to="/" className="hover:text-lime-300 transition">Schedule</Link></li>
          <li><Link to="/about" className="hover:text-lime-300 transition">About Us</Link></li>
          <li><Link to="/questions" className="hover:text-lime-300 transition">Practice Resources</Link></li>
          <li><Link to="/t&c" className="hover:text-lime-300 transition">Terms & Conditions</Link></li>
        </ul>

        {/* Newsletter and Socials */}
        <section className="flex flex-col md:w-1/3">
          <label htmlFor="newsletter" className="text-lg font-semibold mb-2 cursor-pointer hover:text-lime-300 transition">
            Subscribe to Newsletter
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="newsletter"
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 rounded-md bg-white text-cyan-900 placeholder-cyan-600 border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label="Email input for newsletter subscription"
            />
            <button className="px-4 py-2 rounded-md bg-lime-400 text-cyan-900 font-medium hover:bg-lime-500 transition focus:outline-none focus:ring-2 focus:ring-lime-600">
              Subscribe
            </button>
          </div>

          {/* Social Media Links */}
          <nav className="flex gap-4 mt-6 text-3xl" aria-label="Social media links">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:text-lime-300 transition">
              <FaInstagramSquare />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:text-lime-300 transition">
              <IoLogoYoutube />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-lime-300 transition">
              <FaLinkedin />
            </a>
          </nav>
        </section>
      </div>

      <p className="text-center text-sm text-lime-300 mt-10">&copy; {new Date().getFullYear()} ReadySetHire. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
