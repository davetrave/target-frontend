import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const LoadingAnimation = () => {
  useEffect(() => {
    // Create stars dynamically and animate them with GSAP
    const numStars = 100;
    const starsContainer = document.querySelector('.stars-bg');

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 3 + 1}px`; // Random size between 1px and 4px
      star.style.height = star.style.width;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      starsContainer.appendChild(star);

      gsap.to(star, {
        y: '+=20vh',
        repeat: -1,
        duration: Math.random() * 5 + 5, // Random duration for each star
        ease: 'linear',
      });

      gsap.fromTo(
        star,
        { opacity: 0 },
        {
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: Math.random() * 1 + 0.5, // Twinkling effect
          ease: 'power1.inOut',
        }
      );
    }

    // GSAP Spinner Animation
    const spinner = document.querySelector('.spinner');
    gsap.to(spinner, {
      rotation: 360,
      repeat: -1,
      duration: 1,
      ease: 'linear',
    });
  }, []);

  return (
    <div className="loading-screen h-screen w-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Moving Stars Background */}
      <div className="stars-bg absolute inset-0 z-0"></div>

      {/* Spinner in the center */}
      <div className="spinner z-10" style={{
        width: '50px',
        height: '50px',
        border: '6px solid rgba(255, 255, 255, 0.3)',
        borderTop: '6px solid white',
        borderRadius: '50%',
      }}></div>
    </div>
  );
};

export default LoadingAnimation;
