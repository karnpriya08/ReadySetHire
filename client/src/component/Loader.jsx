import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );
};

export default Loader;
