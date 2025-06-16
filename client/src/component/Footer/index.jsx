import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/logo1.png';
import { FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io5';

const index = () => {
  return (
    <footer className="bg-cyan-800 text-lime-400 py-4 px-8 w-full">
      <main className='flex flex-col md:flex-row justify-around gap-4'>
        {/* logo and intro */}
        <section className='flex flex-col'>
          {/* logo */}
          <Link to='/'>
            <section className='flex py-3 '>
              <img src={Image} alt="logo" width={75} height={75} className='hover:scale-105 ' />
              <div className='p-2.5 hover:scale-105'>
                <h1 className='px-5'>ReadySetHire</h1>
                <p className='text-shadow-xs text-xs'>clear steps toward success</p>
              </div>
            </section>
          </Link>
          {/* intro */}
          <div className='text-sm'>
            <p>Mock interview Scheduling app,</p>
            <p>where student can schedule interview,</p>
            <p> can see completed, upcoming interviews.</p>
          </div>
        </section>
        {/* quick links */}
        <ul className='flex flex-col justify-around gap-0.5'>
          <li className='pb-5 text-xl hover:underline hover:scale-105'>Quick Links</li>
          <Link to='/'><li>Schedule</li></Link>
          <Link to='/about'><li>About us</li></Link>
          <Link to='/questions'><li>Practice Resources</li></Link>
          <Link to='/t&c'><li>Terms & Conditions</li></Link>
        </ul>
        {/* email */}
        <section className='flex flex-col justify-around gap-6 '>
          <p className='text-lg hover:text-white'>Subscribe To Newsletter</p>
          <input type="text" placeholder='Enter Email'
            className='bg-white border-cyan-200 rounded-xl p-2 text-cyan-500 w-1/2 md:w-full' />
          {/* links */}
          <nav className='flex flex-row  md:gap-3 w-full'> Social:
            <div className='p-1 cursor-pointer text-2xl hover:scale-150'><a href="https://www.instagram.com" target="_blank"> <span className=''><FaInstagramSquare /></span></a></div>
            <div className='p-1 cursor-pointer text-2xl hover:scale-150'><a href="https://www.youtube.com" target="_blank"><IoLogoYoutube /></a></div>
            <div className='p-1 cursor-pointer text-2xl hover:scale-150'><a href="https://www.linkedin.com" target="_blank"><FaLinkedin /></a></div>
          </nav>
        </section>
      </main>
      <p className='text-white text-center p-4'>&copy; {new Date().getFullYear()} ReadySetHire. All rights reserved.</p>
    </footer>
  );
}

export default index;