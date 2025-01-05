import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { getHintVideoUrl } from '../services/CourseService';
import LoadingAnimation from './LoadingAnimation';

const HowToVideo = () => {
    const [hintVideoUrl, setHintVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideoUrl = async () => {
          try {
            const data = await getHintVideoUrl();
            console.log("data:> ",data);
            setHintVideoUrl(data.url);
          } catch (error) {
            console.error('Error fetching hint video URL:', error);
          }
        };
    
        fetchVideoUrl();
      }, []);

    if (!hintVideoUrl) {
        return <LoadingAnimation />
    }

    return (
        <>
        
            <div className="relative w-full h-screen bg-black flex items-center justify-center">
              <ReactPlayer
                  url={hintVideoUrl}
                  playing
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
              />
              <div 
                className="absolute top-0 left-0 w-full h-full bg-transparent" 
                style={{ pointerEvents: 'auto' }} >
              </div>
            </div>
        </>
    );
};

export default HowToVideo;