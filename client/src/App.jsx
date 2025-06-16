import React from 'react'
import Routing from './component/Routing'
import toast, { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
    {/* to toast messages */}
     <Toaster />
     {/* ful routes */}
    <div>
    <Routing/>
    </div>
      
    </>
  )
}

export default App
