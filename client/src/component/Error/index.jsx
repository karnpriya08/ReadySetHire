import React from 'react';
import { Link } from 'react-router-dom';
import Bg from '../../assets/images/bg.avif';
import Logo from '../../assets/images/logo1.png';

const index = () => {
  return (
    <div  className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-white px-4 py-12"
      style={{ backgroundImage: `url(${Bg})` }} >
   
      {/* Logo */}
      <div className="flex items-center gap-4 mb-6">
        <img src={Logo} alt="logo" width={60} height={60} className="hover:scale-110 transition" />
        <div className="bg-black bg-opacity-50 px-4 py-2 rounded shadow-lg">
          <h1 className="text-2xl font-bold text-lime-400">ReadySetHire</h1>
          <p className="text-sm text-cyan-100">Clear steps toward success</p>
        </div>
      </div>

      {/* Error Content */}
      <div className="bg-black bg-opacity-60 p-8 rounded-xl shadow-2xl text-center max-w-xl w-full animate-fade-in">
        <h1 className="text-7xl font-extrabold text-lime-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-cyan-200 mb-6">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track!
        </p>
        <Link  to="/"
          className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition"
        >Go Home</Link>       
      </div>
    </div>
  );
};

export default index;