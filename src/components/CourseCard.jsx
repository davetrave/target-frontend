import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaCartPlus, FaCheck } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { cart, addToCart, purchasedCourses } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const isInCart = cart.some(cartItem => cartItem.course.id === course.id);
    setInCart(isInCart);

    const isCoursePurchased = purchasedCourses.some(purchased => purchased.course.id === course.id);
    setIsPurchased(isCoursePurchased);
  }, [cart, purchasedCourses, course.id]);

  const handleCardClick = () => {
    navigate(`/course/overview/${course.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!inCart && !isPurchased) {
      addToCart(course.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="course-card flex bg-gray-900 bg-opacity-70 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out relative overflow-hidden"
    >
      <div className="w-1/3 flex-shrink-0">
        <img
          src={course.img_url}
          alt={course.title}
          className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="w-2/3 pl-4">
        <h2 className="text-xl font-bold mb-2 text-white">{course.title}</h2>
        <h6 className="text-sm font-bold mb-2 text-white"> for {course.category}</h6>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-400 ${i < course.rating ? 'text-yellow-500' : 'text-gray-500'}`}
            />
          ))}
        </div>
        <div className='text-white'>
          <span className='font-bold text-lg'>{Math.trunc(course.price)}</span><sup>ETB</sup>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`ml-4 px-3 py-2 text-sm font-semibold text-white rounded-lg flex items-center ${isPurchased ? 'bg-blue-500 cursor-not-allowed' : inCart ? 'bg-green-500 cursor-not-allowed' : 'magic-button bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'}`}
            onClick={handleButtonClick}
            disabled={isPurchased || inCart}
          >
            {isPurchased ? <><FaCheck className="mr-2" /> Purchased</> : inCart ? <><FaCheck className="mr-2" /> Added to Cart</> : <><FaCartPlus className="mr-2" /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
