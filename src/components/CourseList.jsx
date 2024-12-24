import React, { useState, useEffect, useContext } from 'react';
import { getCourses } from '../services/CourseService';
import { gsap } from 'gsap';
import CourseCard from './CourseCard';
import { CartContext } from '../context/CartContext';
import { addToCart, getCart } from '../services/CartService';
import { useFlashMessage } from "../context/FlashMessageContext";
import LoadingAnimation from './LoadingAnimation'
import BottomNavBar from './BottomNavBar';

const CourseList = () => {
  const showMsg = useFlashMessage();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradient, setGradient] = useState('from-purple-600 via-pink-500 to-purple-700');
  const { setCartCount, updatePurchasedCourses } = useContext(CartContext);

  useEffect(() => {
  
    const fetchCoursesAndCart = async () => {
      try {
        const [coursesData, cartData] = await Promise.all([getCourses(), getCart()]);
        setCourses(coursesData);
        setFilteredCourses(coursesData);
        setCart(cartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses or cart:', error.response);
        setFetchError('Failed to fetch courses or cart. Please try again later.');
      }
    };
  
    fetchCoursesAndCart();
    updatePurchasedCourses();
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
      const response = await addToCart(courseId);
      console.log(response)
      if (response.error){
        showMsg(response.detail, 'error');
      }
      else{
        setCartCount((prevCount) => prevCount + 1);
        setCart([...cart, courseId]); // Update the cart state
      }
      
    } catch (error) {
      console.error('Error adding course to cart:', error);
    }
  };

  if (!courses) {
    return <LoadingAnimation />
  }

  return (
    <>
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden mb-10 pb-20">
      {/* Gradient background fills the entire screen */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0`}></div>
      
      {/* Course content */}
      <div className="relative z-10 grid grid-cols-1">
      <h2 className="text-3xl font-bold text-white mb-4">Courses</h2>
        {/* Category Selection */}
        {/* <div className="mb-6">
          <button
            className="px-4 py-2 mr-4 bg-green-500 text-white rounded-lg"
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          <button
            className="px-4 py-2 mr-4 bg-blue-500 text-white rounded-lg"
            onClick={() => handleCategoryChange('G-11')}
          >
            Grade 11
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
            onClick={() => handleCategoryChange('G-12')}
          >
            Grade 12
          </button>
        </div> */}

        {/* Course Cards */}
        
        { loading ? (<LoadingAnimation/>) : 
        (filteredCourses.map((course) => (
          <div className='m-2'>
            <CourseCard
              key={course.id}
              course={course}
              handleAddToCart={handleAddToCart}
              isAddedToCart={cart.includes(course.id)}
            />
          </div>
        )))}
        
      </div>
    </div>
    
    </>
  );
};

export default CourseList;
