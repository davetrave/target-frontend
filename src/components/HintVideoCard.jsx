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
      className="w-full h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-gradient-x cursor-pointer flex items-center justify-center"
    >
      <h3 className="text-white text-sm font-bold">Click Here to Watch how to use the App</h3>
      <div className="badge absolute top-2 right-2"></div>
    </div>
  );
};

export default HintVideoCard;