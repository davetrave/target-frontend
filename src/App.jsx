import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartProvider from './context/CartContext';
import FlashMessageProvider from './context/FlashMessageContext';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import CourseOverview from './components/CourseOverview';
import MyCourses from './components/MyCourses';
import Cart from './components/Cart';
import BottomNavBar from './components/BottomNavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import TelegramLogin from './components/TelegramLogin';
import Register from "./components/Register";
import Protected from "./components/ProtectedRoute";
import Profile from "./components/Profile"
import HowToVideo from './components/HowToVideo';

const App = () => {
  return (
    <FlashMessageProvider>
      <CartProvider>
        <BrowserRouter>
        
          <Routes>
            <Route path="/" exact element={<Protected><LandingPage /></Protected>} />
            <Route path="/home" exact element={<Protected><LandingPage /></Protected>} />
            <Route path="/courses" exact element={<Protected><CourseList /></Protected>} />
            <Route path="/My Cart" exact element={<Protected><Cart /></Protected>} />
            
            <Route path="/how-to-video" exact element={<Protected><HowToVideo /></Protected>} />
            <Route path="/My" exact element={<Protected><MyCourses /></Protected>} />
            <Route path="/Profile" element={<Protected><Profile /></Protected>} />
            <Route path="/course/:id" element={<Protected><CourseDetail /></Protected>} />
            <Route path="/course/overview/:id" element={<Protected><CourseOverview /></Protected>} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/telegram/login" exact element={<TelegramLogin />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
          <BottomNavBar />
        </BrowserRouter>
        
      </CartProvider>
    </FlashMessageProvider>
      
    
  );
};



export default App;
