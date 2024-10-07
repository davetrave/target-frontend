import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/CourseService';
import LoadingAnimation from './LoadingAnimation'
import BottomNavBar from './BottomNavBar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

gsap.registerPlugin(ScrollTrigger);

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoIndex, setVideoIndex] = useState({ lectureIndex: -1, lessonIndex: -1 });
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        setCurrentVideo(data.preview_url); // Start with course preview
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

  const handleLessonClick = (videoUrl, lectureIndex, lessonIndex) => {
    setCurrentVideo(videoUrl);
    setVideoIndex({ lectureIndex, lessonIndex });
  };

  const handleVideoEnd = () => {
    const { lectureIndex, lessonIndex } = videoIndex;

    // If still in the preview video, start the first lesson
    if (lectureIndex === -1 && lessonIndex === -1 && course.lectures.length > 0) {
      setCurrentVideo(course.lectures[0].lessons[0].video_url);
      setVideoIndex({ lectureIndex: 0, lessonIndex: 0 });
    }
    // If watching a lesson, move to the next lesson or lecture
    else if (lectureIndex >= 0) {
      const currentLecture = course.lectures[lectureIndex];

      // Move to the next lesson in the same lecture
      if (lessonIndex < currentLecture.lessons.length - 1) {
        const nextLesson = currentLecture.lessons[lessonIndex + 1];
        setCurrentVideo(nextLesson.video_url);
        setVideoIndex({ lectureIndex, lessonIndex: lessonIndex + 1 });
      }
      // Move to the next lecture's first lesson
      else if (lectureIndex < course.lectures.length - 1) {
        const nextLecture = course.lectures[lectureIndex + 1];
        setCurrentVideo(nextLecture.lessons[0].video_url);
        setVideoIndex({ lectureIndex: lectureIndex + 1, lessonIndex: 0 });
      }
    }
  };

  const toggleAccordion = (lectureId) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [lectureId]: !prevState[lectureId],
    }));
  };

  if (!course) {
    return <LoadingAnimation/>
  }

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white mb-10 pb-20">
      {/* Sticky Header Video */}
      <div className="sticky top-0 z-50 bg-gray-900">
        <div className="video-wrapper">
          <ReactPlayer 
            url={currentVideo} 
            controls 
            width="100%" 
            height="100%"
            className="react-player"
            onEnded={handleVideoEnd} 
            config={{
              youtube: {
                playerVars: { rel: 0, controls: 1, modestbranding: 1 }, // No related videos
              },
            }}
          />
          <div 
            className="absolute top-0 left-0 w-full h-1/4 bg-transparent" 
            style={{ pointerEvents: 'auto' }} >
            
          </div>
          <div 
            className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-transparent"
            style={{ pointerEvents: 'auto' }} >
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold m-1">{course.title}</h2>
      <h2 className='text-xl m-4' >Curated By <span className='font-bold text-sm'> {course.author.first_name} {course.author.last_name} </span> </h2>

      {/* Accordion */}
      <Accordion allowZeroExpanded>
        {course.lectures.map((lecture, lectureIndex) => (
          <AccordionItem key={lecture.id}>
            <AccordionItemHeading>
              <AccordionItemButton
                className="flex justify-between items-center bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden"
                onClick={() => toggleAccordion(lecture.id)}
              >
                <h6 className="text-sm font-bold">{lecture.title}</h6>
                {/* Toggle between CaretDown and CaretUp */}
                {expandedItems[lecture.id] ? <FaCaretUp /> : <FaCaretDown />}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="space-y-2">
                {lecture.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="lesson-card bg-gray-800 bg-opacity-60 p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center"
                    onClick={() => handleLessonClick(lesson.video_url, lectureIndex, lessonIndex)}
                  >
                    <div>
                      <p className="text-white mb-1 text-sm">{lesson.title}</p>
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
    
    </>
  );
};

export default CourseDetail;
