import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/CourseService';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

gsap.registerPlugin(ScrollTrigger);

const getYoutubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

const videoOptions = {
  height: '200',
  width: '100%',
  playerVars: {
    autoplay: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 1,
    disablekb: 0,
    iv_load_policy: 0,
  },
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        setCurrentVideo(data.preview_url);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course) {
      gsap.utils.toArray('.lesson-card').forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              once: true,
            },
          }
        );
      });
    }
  }, [course]);

  const handleLessonClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white mb-10 pb-20">
      {/* Header video */}
      <div className="relative h-auto w-full overflow-hidden">
          <ReactPlayer 
                      url={course.preview_url} 
                      controls 
                      className="mb-4"
                      width="100%"
                  />
          <div 
                className="absolute top-0 left-0 w-full h-1/4 bg-transparent" 
                style={{ pointerEvents: 'auto' }} // Makes the overlay catch pointer events
            ></div>
          <div 
                className="absolute bottom-0 right-0 w-1/3 h-1/5 bg-transparent"
                style={{ pointerEvents: 'auto' }} 
            ></div>
      </div>
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>

      <Accordion allowMultipleExpanded allowZeroExpanded>
        {course.lectures.map((lecture) => (
          <AccordionItem key={lecture.id}>
            <AccordionItemHeading>
              <AccordionItemButton className="flex justify-between items-center bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center">
                <h6 className="text-sm font-bold">{lecture.title}</h6>
                <FaCaretRight className="accordion-caret" />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="space-y-2">
                {lecture.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="lesson-card bg-gray-800 bg-opacity-60 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center"
                    onClick={() => handleLessonClick(lesson.video_url)}
                  >
                    <div>
                      <p className="text-gray-400 mb-1 text-sm">{lesson.title}</p>
                    </div>
                    <FaPlay className="text-white text-2xl cursor-pointer" />
                  </div>
                ))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseDetail;
