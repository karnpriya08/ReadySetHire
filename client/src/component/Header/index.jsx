import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../assets/images/logo1.png';
import { PiUserCircleFill } from "react-icons/pi";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';
import { logout } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';

const index = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // getting useinfo from redux 
  // const userInfo = useSelector((state) => state.auth.userInfo);
  // const isLoggedIn = !!userInfo?.token;

  const token = useSelector((state) => state.auth.token);
const isLoggedIn = !!token;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user button handling
  const handleClick = () => {
    setModalOpen(!modalOpen);
  }
  // hamburger button handling
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success("successfully logged out")
    setModalOpen(false); 
    navigate('/login')
  }

  return (
    <>
      <header className='fixed top-0 left-0 w-full bg-cyan-800 text-lime-200  flex justify-between z-50'>
        {/* logo section */}
        <Link to='/'>
          <section className='flex ml-2 p-2'>
            <img src={Image} alt="logo" width={75} height={75} className='hover:scale-105' />
            <div className='p-1.5 hover:scale-105'>
              <h1 className='px-8'>ReadySetHire</h1>
              <p className='text-shadow-xs  text-xs '>clear steps toward sucess</p>
            </div>
          </section>
        </Link>
        {/* for desktop view  */}
        <nav className='p-5'>
          <ul className='hidden md:flex justify-between gap-8 '>
            <li><Link to='/'>Schedule</Link></li>
            <li><Link to='/interviews'> My Interviews</Link></li>
            <li><Link to='/questions'>Practice Resources</Link></li>
          </ul>
        </nav>
        {/* profile logo with drop down */}
        <button aria-label="user menu" className='p-5 px-10' onClick={handleClick} >
          <PiUserCircleFill className='text-3xl hover:text-white'/>
        </button>
        {/* hamburger button */}
        <button aria-label="menu toggle" className='md:hidden p-6 text-xl hover:text-white' onClick={toggleMenu}>
          {menuOpen ? <FaTimes className='text-xl' /> : <IoReorderThreeOutline className='text-2xl' />}
        </button> 
        {/* navbar ends */}
      </header>

      {/* DROPDOWN OF PROFILE  */}
      {modalOpen && (
        <div className="fixed top-[70px] right-4 bg-white w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-xl p-5 z-[100]" >      
          <ul>
            {isLoggedIn ? (
              <>
                <Link to="/profile"><li className="text-cyan-400 hover:scale-105 m-1">My Profile</li></Link>
                <li className="text-cyan-400 hover:scale-105 m-1" onClick={handleLogout}>Logout</li>
              </>
            ) : (
              <>
                <Link to="/register"><li onClick={handleClick} className="text-cyan-400 hover:scale-105 m-1">Register</li></Link>
                <Link to="/login"><li onClick={handleClick} className="text-cyan-400 hover:scale-105 m-1">Login</li></Link>
              </>
            )}
          </ul>
        </div>
      )}
      {/* mobile navigations  */}
      {menuOpen &&
        (<nav data-testid="mobile-menu" className='fixed bg-white w-1/2 top-[70px] left-1/2 p-2 rounded-lg shadow-xl z-[100]'>
          <ul className='p-2 m-1'>
            <Link to='/'>
              <li className='text-cyan-400 hover:scale-105 m-1'
                onClick={toggleMenu}>Schedule</li></Link>
            <Link to='/interviews'>
              <li className='text-cyan-400 hover:scale-105 m-1'
                onClick={toggleMenu}>My Interviews</li></Link>
            <Link to='/questions'>
              <li className='text-cyan-400 hover:scale-105 m-1'
                onClick={toggleMenu}>Practice Resources</li></Link>
            <Link to='/about'>
              <li className='text-cyan-400 hover:scale-105 m-1'
                onClick={toggleMenu}>About Us</li></Link>
          </ul>
        </nav>)
      }
    </>
  )
}

export default index;