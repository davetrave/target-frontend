import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getCourseById, getCourseComments, postCourseComment } from '../services/CourseService';
import RatingPopup from './RatingPopup';
import LoadingAnimation from './LoadingAnimation'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import BottomNavBar from './BottomNavBar';

const CourseOverview = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [isRatingPopupOpen, setRatingPopupOpen] = useState(false);
    const [activeLecture, setActiveLecture] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseById(id);
                setCourse(data);
                console.log(data);
                setVideo(data.preview_url)
            } catch (error) {
                console.error('Error fetching course details:', error);
            }


        };
        
        const fetchComments = async () => {
            try {
                const commentsData = await getCourseComments(id);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        
        fetchCourse();
        fetchComments();
    }, [id]);

    const handleRatingSubmit = async ({ rating, comment }) => {
        try {
            await postCourseComment(id, { rating, text: comment });
            const updatedComments = await getCourseComments(id);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error submitting comment:', error.response);
        }
    };

    const toggleLecture = (lectureId) => {
        setActiveLecture(activeLecture === lectureId ? null : lectureId);
    };

    const handleVideoEnd = () => {
        setVideo(course.preview_url)
    }

    if (!course) {
        return <LoadingAnimation/>;
    }

    return (
        <>
        <div className="min-h-screen bg-gray-900 text-white mb-10 pb-20">
            {/* Header Image */}
            <div className="sticky top-0 z-50 bg-gray-900">
                <div className="video-wrapper">
                    <ReactPlayer 
                        url={video} 
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
                    style={{ pointerEvents: 'auto' }} // Makes the overlay catch pointer events
                    ></div>
                    <div 
                        className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-transparent"
                        style={{ pointerEvents: 'auto' }} 
                    ></div>

                </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Right Column: Instructor Info and Related Courses */}
                    <h2 className="text-xl font-bold mb-4">{course.title} </h2>
                    <p className="text-lg mb-4">{course.description}</p>
                    <div className="md:w-1/3 md:pl-8">
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                            
                            <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
                            <p>{course.author.first_name} {course.author.last_name}</p>
                        </div>
                        
                    </div>
                    {/* Left Column: Course Content */}
                    <div className="md:w-2/3">
                        {/* <h2 className="text-2xl font-bold mb-4">Course Description</h2> */}
                        
                        
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                            <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
                            <div className="space-y-4">
                                {course.lectures.map(lecture => (
                                    <div key={lecture.id} className="bg-gray-700 rounded-lg">
                                        <button
                                            onClick={() => toggleLecture(lecture.id)}
                                            className="w-full text-left p-4 text-lg font-medium bg-gray-700 rounded-lg flex items-center justify-between focus:outline-none"
                                        >
                                            {lecture.title}
                                            {activeLecture === lecture.id ? (
                                                <FaCaretUp className="ml-2" />
                                            ) : (
                                                <FaCaretDown className="ml-2" />
                                            )}
                                        </button>
                                        {activeLecture === lecture.id && (
                                            <div className="bg-gray-600 p-4 rounded-b-lg">
                                                {lecture.lessons.map(lesson => ( 
                                                    <div key={lesson.id} className="p-2 bg-gray-800 mb-2 rounded-lg">
                                                        <p className="text-sm text-white">{lesson.title}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => setRatingPopupOpen(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Rate and Comment
                        </button>
                    </div>
                    
                </div>
                {/* Comments Section */}
                <div className="bg-gray-800 p-4 rounded-lg mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="bg-gray-700 p-4 rounded-lg flex items-center">
                                <img
                                    src={comment.profile_image}
                                    alt={comment.username}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium">{comment.username}</p>
                                        <p className="text-sm">{comment.rating} Stars</p>
                                    </div>
                                    <p className="mt-2 text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <RatingPopup
                open={isRatingPopupOpen}
                handleClose={() => setRatingPopupOpen(false)}
                handleSubmit={handleRatingSubmit}
            />
        </div>
        
        </>
    );
};

export default CourseOverview;
