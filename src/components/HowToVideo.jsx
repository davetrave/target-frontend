import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { getHintVideoUrl } from '../services/CourseService';
import LoadingAnimation from './LoadingAnimation';

const HowToVideo = () => {
    const [hintVideoUrl, setHintVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoUrl = async () => {
          try {
            const data = await getHintVideoUrl();
            console.log("data:> ",data);
            setHintVideoUrl(data.url);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching hint video URL:', error);
          }
        };
    
        fetchVideoUrl();
      }, []);

    return (
        <>
        {loading ? (<LoadingAnimation />) : (
        <div className="w-full h-screen bg-black flex items-center justify-center">
        <ReactPlayer
            url={hintVideoUrl}
            playing
            controls
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
        />
        </div>)}
        </>
    );
};

export default HowToVideo;