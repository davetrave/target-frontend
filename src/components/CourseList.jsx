import React, { useState, useEffect, useContext } from 'react';
import { getCourses } from '../services/CourseService';
import { gsap } from 'gsap';
import CourseCard from './CourseCard';
import { CartContext } from '../context/CartContext';
import { addToCart, getCart } from '../services/CartService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [cart, setCart] = useState([]);
  const [gradient, setGradient] = useState('from-purple-600 via-blue-500 to-purple-700');
  const { setCartCount, updatePurchasedCourses } = useContext(CartContext);

  useEffect(() => {
    const fetchCoursesAndCart = async () => {
      try {
        const [coursesData, cartData] = await Promise.all([getCourses(), getCart()]);
        setCourses(coursesData);
        setFilteredCourses(coursesData);
        setCart(cartData);
      } catch (error) {
        console.error('Error fetching courses or cart:', error.response);
        setFetchError('Failed to fetch courses or cart. Please try again later.');
      }
    };

    fetchCoursesAndCart();
    updatePurchasedCourses();

  }, []);

  useEffect(() => {
    const createStars = (count) => {
      const container = document.querySelector('.stars-bg');
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        container.appendChild(star);
      }
    };

    createStars(100);

    gsap.to('.star', {
      y: '+=10vh',
      repeat: -1,
      duration: () => Math.random() * 5 + 5,
      ease: 'linear',
    });

    gsap.fromTo(
      '.star',
      { opacity: 0 },
      {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: () => Math.random() * 1 + 0.5,
        ease: 'power1.inOut',
      }
    );

    gsap.to('.parallax-bg', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-bg',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const handleCategoryChange = (category) => {
    let filtered = courses;

    if (category === 'all') {
      filtered = courses;
      setGradient('from-green-700 via-yellow-500 to-red-700');
    } else if (category === 'G-11') {
      filtered = courses.filter((course) => course.category === "Grade 11");
      setGradient('from-purple-600 via-blue-500 to-purple-700');
    } else if (category === 'G-12') {
      filtered = courses.filter((course) => course.category === "Grade 12");
      setGradient('from-purple-600 via-pink-500 to-purple-700');
    }
    setFilteredCourses(filtered);
  };

  const handleAddToCart = async (courseId) => {
    try {
      await addToCart(courseId);
      setCartCount((prevCount) => prevCount + 1);
      setCart([...cart, courseId]); // Update the cart state
    } catch (error) {
      console.error('Error adding course to cart:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden mb-10 pb-5">
      <div className="absolute inset-0 z-0 stars-bg"></div>
      <div className="absolute inset-x-0 top-0 z-20 bg-gray-800 bg-opacity-60 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button onClick={() => handleCategoryChange('all')} className="nav-pill">All Courses</button>
              <button onClick={() => handleCategoryChange('G-11')} className="nav-pill">Grade 11</button>
              <button onClick={() => handleCategoryChange('G-12')} className="nav-pill">Grade 12</button>
            </nav>
          </div>
        </div>
      </div>
      <div className="relative z-10 p-6">
        {fetchError && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{fetchError}</div>
        )}
        <h2 className="text-3xl font-bold mb-4">Courses</h2>
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${gradient}`}></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} handleAddToCart={handleAddToCart} isAddedToCart={cart.includes(course.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;


