import React, { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useFlashMessage } from '../context/FlashMessageContext';
import BottomNavBar from './BottomNavBar';

const MyCourses = () => {
  const showMessage = useFlashMessage(); // Get the showMessage function
  const navigate = useNavigate();
  const { purchasedCourses } = useContext(CartContext);
  const purchasedRef = useRef([]);
  
  const handleCardClick = (course) => {

    if (course.verified) {
      showMessage('Enjoy your course!', 'success')
      navigate(`/course/${course.course.id}`);
    }
    else {
      showMessage('Please, wait until your purchase is verified, We appreciate your patience!', 'error')
    }
    
  };


  useEffect(() => {
    purchasedRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { scale: 0, rotationY: 180, opacity: 0 },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: index * 0.1,
        }
      );
    });
  }, [purchasedCourses]);

  return (
    <>
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden mb-10 pb-20">
      <h2 className="text-3xl text-white text-center my-4">My Courses</h2>
      {purchasedCourses.length > 0 ? (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((item, index) => (
            <div
              onClick={(id) => {handleCardClick(item)}}
              key={item.id}
              ref={(el) => (purchasedRef.current[index] = el)}
              className="course-card flex bg-gray-600 bg-opacity-70 p-4 ml-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out relative overflow-hidden"
            >
              <div className="w-1/3 flex-shrink-0">
                <img
                  src={item.course.img_url}
                  alt={item.course.title}
                  className="w-32 h-auto object-cover rounded-lg mr-4"
                />
              
              </div>
              <div className="w-2/3 pl-4">
                <h3 className="text-xl font-bold mb-2 text-white">{item.course.title}</h3>
                {item.verified ? (
                  <h4 className="text-green-500">Verified Purchase</h4>
                ) : (
                  <h4 className="text-red-500">Payment Unverified</h4>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">You haven't purchased any courses yet.</p>
      )}
    </div>
    
    </>
  );
};

export default MyCourses;
