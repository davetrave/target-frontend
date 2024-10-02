// import React, { useEffect } from 'react';
// import gsap from 'gsap';

// const LandingPage = () => {
//   useEffect(() => {
//     const stars = document.querySelectorAll('.star');

//     stars.forEach(star => {
//       // Randomize the animation parameters
//       const startX = Math.random() * 100;
//       const startY = Math.random() * 100;
//       const endX = Math.random() * 100;
//       const endY = Math.random() * 100;
//       const duration = Math.random() * 10 + 10; // Duration between 10s and 20s
//       const delay = Math.random() * 5; // Delay between 0s and 5s

//       gsap.fromTo(
//         star,
//         {
//           x: `${startX}vw`,
//           y: `${startY}vh`,
//         },
//         {
//           x: `${endX}vw`,
//           y: `${endY}vh`,
//           repeat: -1,
//           duration,
//           ease: 'linear',
//           delay,
//         }
//       );
//     });

//     gsap.to('.gradient', {
//       background: 'linear-gradient(45deg, #000000, #6e40c9, #b96c3c, #1d9d74)',
//       duration: 10,
//       repeat: -1,
//       ease: 'power2.inOut',
//       backgroundSize: '400% 400%',
//     });
//   }, []);

//   return (
//     <div className="relative w-full h-screen flex flex-col justify-center items-center text-white bg-gray-900 overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="gradient absolute top-0 left-0 w-full h-full"></div>
//         {Array.from({ length: 50 }).map((_, i) => (
//           <div
//             key={i}
//             className={`star absolute rounded-full ${i < 10 ? 'bg-gray-300' : 'bg-white'}`} // Non-moving stars with different colors
//             style={{
//               width: `${Math.random() * 2 + 1}px`,
//               height: `${Math.random() * 2 + 1}px`,
//               opacity: i < 10 ? 0.8 : 1 // Adjust opacity for non-moving stars
//             }}
//           ></div>
//         ))}
//       </div>
//       <div className="relative z-10 text-center px-4">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Target Tutorials</h1>
//         <p className="text-lg">Enhance your skills with our comprehensive courses.</p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import CourseCard from './CourseCard'; // Assuming you have a CourseCard component
import { getCourses } from '../services/CourseService'; // Assuming you have a service to fetch courses

const LandingPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      const duration = Math.random() * 10 + 10; 
      const delay = Math.random() * 5;

      gsap.fromTo(
        star,
        { x: `${startX}vw`, y: `${startY}vh` },
        {
          x: `${endX}vw`,
          y: `${endY}vh`,
          repeat: -1,
          duration,
          ease: 'linear',
          delay,
        }
      );
    });

    gsap.to('.gradient', {
      background: 'linear-gradient(45deg, #000000, #6e40c9, #b96c3c, #1d9d74)',
      duration: 10,
      repeat: -1,
      ease: 'power2.inOut',
      backgroundSize: '400% 400%',
    });
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-start items-center text-white bg-gray-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="gradient absolute top-0 left-0 w-full h-full"></div>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`star absolute rounded-full ${i < 10 ? 'bg-gray-300' : 'bg-white'}`}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: i < 10 ? 0.8 : 1
            }}
          ></div>
        ))}
      </div>

      {/* Header Text */}
      <div className="relative z-10 text-center px-4 mt-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Target Tutorials</h1>
        <p className="text-lg my-10">The Platform Where You Can Boost Your Scientific Studying Techniques
           And Hone Your Problem Solving Skills In Areas Of Mathematics And Science.</p>
           <p className="text-lg my-10">You Can Get Courses Curated By The Most Experienced Teachers and Instructors.</p>
      </div>

      {/* Course Slider */}
      {/* <div className="relative z-10 mt-12 w-full overflow-x-auto">
        <div className="flex space-x-4 px-4">
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-64">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
