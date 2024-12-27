import React from 'react';
import { useNavigate } from 'react-router-dom';

const HintVideoCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/how-to-video');
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x cursor-pointer flex items-center justify-center"
    >
      <h3 className="text-white text-xl font-bold">Watch How-To Video</h3>
    </div>
  );
};

export default HintVideoCard;