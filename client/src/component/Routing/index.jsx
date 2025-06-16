import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import PracticeResources from '../../pages/practiceResource';
import Interviews from '../../pages/Interviews';
import About from '../../pages/About/index';
import Login from '../../pages/Login/index';
import Register from '../../pages/Register';
import Header from '../Header';
import Footer from '../Footer';
import MyProfile from '../../pages/MyProfile';

const index = () => {

    return (
        
            <BrowserRouter>
            <Header />
            
                <Routes>                    
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/Interviews' element={<Interviews />} />
                    <Route path='/questions' element={<PracticeResources />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/about' element={<About />} />
                    <Route path="/profile" element={<MyProfile />} />
                </Routes>

                <Footer />
            </BrowserRouter>
        
    )
}


export default index;