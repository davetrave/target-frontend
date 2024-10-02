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
import Register from "./components/Register";
import Protected from "./components/ProtectedRoute";

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
            <Route path="/My" exact element={<Protected><MyCourses /></Protected>} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/course/:id" element={<Protected><CourseDetail /></Protected>} />
            <Route path="/course/overview/:id" element={<Protected><CourseOverview /></Protected>} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
          <BottomNavBar />
        </BrowserRouter>
        
      </CartProvider>
    </FlashMessageProvider>
      
    
  );
};

const SettingsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Manage your account settings here.</p>
    </div>
  );
};

export default App;
