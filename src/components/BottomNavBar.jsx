import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaCog, FaShoppingCart, FaUniversity, FaCheckDouble, FaBookOpen } from 'react-icons/fa';
import gsap from 'gsap';
import { CartContext } from '../context/CartContext';
import confetti from 'canvas-confetti'; // Import confetti library

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { cartCount } = useContext(CartContext);
  const navRefs = useRef([]);

  useEffect(() => {
    const animateTab = (index) => {
      gsap.to('.nav-link-icon', {
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
      });

      gsap.to(navRefs.current[index].querySelector('.nav-link-icon'), {
        y: -10,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const activeIndex = ['home', 'courses', 'My Cart', 'My', 'settings'].indexOf(activeTab);
    animateTab(activeIndex);
  }, [activeTab]);

  const handleNavClick = (tab, index) => {
    setActiveTab(tab);
    triggerConfetti(index); // Trigger confetti animation
  };

  const triggerConfetti = (index) => {
    const confettiColors = ['#ff0', '#ff6347', '#00fa9a', '#1e90ff', '#ff1493'];
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: index / navRefs.current.length, y: 1 },
      colors: [confettiColors[index % confettiColors.length]],
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white flex justify-around items-center py-2 z-30">
      {['home', 'courses', 'My Cart', 'My', 'settings'].map((tab, index) => (
        <NavLink
          to={`/${tab}`}
          key={tab}
          className={`nav-link relative z-10 flex flex-col items-center cursor-pointer ${activeTab === tab ? 'text-yellow-400' : 'text-white-400'}`}
          onClick={() => handleNavClick(tab, index)}
          ref={(el) => (navRefs.current[index] = el)}
        >
          {tab === 'home' && <FaHome className="nav-link-icon" size={20} />}
          {tab === 'courses' && <FaBook className="nav-link-icon" size={20} />}
          {tab === 'My Cart' && (
            <div className="relative">
              <FaShoppingCart className="nav-link-icon" size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>
          )}
          {tab === 'My' && <FaBookOpen className="nav-link-icon" size={20} />}
          {tab === 'settings' && <FaCog className="nav-link-icon" size={20} />}
          {activeTab === tab && (
            <span className="text-xs mt-1">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;

