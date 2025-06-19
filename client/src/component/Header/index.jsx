import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../assets/images/logo1.png';
import { PiUserCircleFill } from "react-icons/pi";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';
import { logout } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Pull auth data from Redux
  const reduxToken = useSelector((state) => state.auth.token);
  const reduxUser = useSelector((state) => state.auth.userInfo);

  // Fallback to localStorage in case Redux is empty (e.g., after refresh)
  const localToken = localStorage.getItem("token");
  const localUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = reduxToken || localToken;
  const user = reduxUser || localUser;
  const isLoggedIn = !!token

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendUrl = "https://readysethire-roqk.onrender.com"; //  backend base URL

  // handling click 
  const handleClick = () => {
    setModalOpen(!modalOpen);
    setMenuOpen(false);
  };

  // toggle option menu and modal 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setModalOpen(false);
  };

  // handling logout
  const handleLogout = () => {
    // trigger logout
    dispatch(logout());
    toast.success("Successfully logged out");
    setModalOpen(false);
    navigate('/login');
  };

  // to close menu and modal if click any where elese
  const closeAllMenus = () => {
    setModalOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header className='fixed top-0 left-0 w-full bg-cyan-800 text-lime-200 flex justify-between items-center z-50 p-2 px-4'>
        {/* logo section */}
        <Link to='/' className='flex items-center gap-3 hover:scale-105 transition'>
          <img src={Image} alt="logo" width={60} height={60} />
          <div>
            <h1 className='text-lg font-semibold'>ReadySetHire</h1>
            <p className='text-xs'>Clear steps toward success</p>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className='hidden md:flex gap-6 items-center'>
          <Link to='/' className='hover:text-white transition focus:outline-none focus:ring-2 focus:ring-lime-400'>Schedule</Link>
          <Link to='/interviews' className='hover:text-white transition focus:outline-none focus:ring-2 focus:ring-lime-400'>My Interviews</Link>
          <Link to='/questions' className='hover:text-white transition focus:outline-none focus:ring-2 focus:ring-lime-400'>Practice Resources</Link>
        </nav>

        {/* profile icon */}
        <button
          aria-label="User menu"
          onClick={handleClick}
          className='p-2 focus:outline-none focus:ring-2 focus:ring-lime-400'
        >
          {user && user.profileImage ? (
            <img
              src={user?.profileImage?.startsWith('http') ? user.profileImage : `${backendUrl}${user.profileImage}`}
              alt="User profile"
              className='w-8 h-8 rounded-full object-cover'
            />
          ) : (
            <PiUserCircleFill className='text-3xl hover:text-white transition' />
          )}
        </button>

        {/* hamburger menu */}
        <button
          aria-label="Toggle navigation"
          onClick={toggleMenu}
          className='md:hidden p-2 text-2xl hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-400'
        >
          {menuOpen ? <FaTimes /> : <IoReorderThreeOutline />}
        </button>
      </header>

      {/* backdrop for dropdowns */}
      {(modalOpen || menuOpen) && (
        <div
          className='fixed inset-0 z-40 bg-black/50'
          onClick={closeAllMenus}
        ></div>
      )}

      {/* profile dropdown */}
      {modalOpen && (
        <div className="fixed top-[70px] right-4 bg-white w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-xl p-4 z-50">
          <ul>
            {isLoggedIn ? (
              <>
                <Link to="/profile"><li className="text-cyan-400 hover:bg-cyan-50 p-2 rounded">My Profile</li></Link>
                <li className="text-cyan-400 hover:bg-cyan-50 p-2 rounded cursor-pointer" onClick={handleLogout}>Logout</li>
              </>
            ) : (
              <>
                <Link to="/register"><li onClick={handleClick} className="text-cyan-400 hover:bg-cyan-50 p-2 rounded">Register</li></Link>
                <Link to="/login"><li onClick={handleClick} className="text-cyan-400 hover:bg-cyan-50 p-2 rounded">Login</li></Link>
              </>
            )}
          </ul>
        </div>
      )}

      {/* mobile navigation */}
      {menuOpen && (
        <nav className='fixed bg-white w-64 top-[70px] left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl z-50'>
          <ul className='flex flex-col gap-2'>
            <Link to='/'><li className='text-cyan-400 hover:bg-cyan-50 p-2 rounded' onClick={toggleMenu}>Schedule</li></Link>
            <Link to='/interviews'><li className='text-cyan-400 hover:bg-cyan-50 p-2 rounded' onClick={toggleMenu}>My Interviews</li></Link>
            <Link to='/questions'><li className='text-cyan-400 hover:bg-cyan-50 p-2 rounded' onClick={toggleMenu}>Practice Resources</li></Link>
            <Link to='/about'><li className='text-cyan-400 hover:bg-cyan-50 p-2 rounded' onClick={toggleMenu}>About Us</li></Link>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
