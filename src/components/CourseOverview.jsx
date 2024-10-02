// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import { getCourseById, getCourseComments, postCourseComment } from '../services/CourseService';
// import RatingPopup from './RatingPopup';

// const CourseOverview = () => {
//     const { id } = useParams();
//     const [course, setCourse] = useState(null);
//     const [comments, setComments] = useState([]);
//     const [isRatingPopupOpen, setRatingPopupOpen] = useState(false);

//     useEffect(() => {
//         const fetchCourse = async () => {
//             try {
//               const data = await getCourseById(id);
//               setCourse(data);
//               console.log(data);
//             } catch (error) {
//               console.error('Error fetching course details:', error);
//             }
//           };
          
//           const fetchComments = async () => {
//             try {
//               const commentsData = await getCourseComments(id);
//               setComments(commentsData);
//             } catch (error) {
//               console.error('Error fetching comments:', error);
//             }
//           };
          
//           fetchCourse();
//           fetchComments();
//     }, [id]);

//     const handleRatingSubmit = async ({ rating, comment }) => {
//         try {
//             await postCourseComment(id, { rating, text: comment });
//             const updatedComments = await getCourseComments(id);
//             setComments(updatedComments);
//         } catch (error) {
//             console.error('Error submitting comment:', error.response);
//         }
//     };

//     if (!course) {
//         return <p>Loading course details...</p>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-900 text-white">
//             {/* Header Image */}
//             <div className="relative h-64 w-full overflow-hidden">
//                 <img
//                     src={course.img_url} 
//                     alt={course.title}
//                     className="object-cover w-full h-full"
//                 />
//                 <div className="absolute inset-0 bg-black opacity-50"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <h1 className="text-4xl font-bold text-white">{course.title}</h1>
//                 </div>
//             </div>

//             <div className="container mx-auto p-4">
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left Column: Course Content */}
//                     <div className="md:w-2/3">
//                         <h2 className="text-2xl font-bold mb-4">Course Description</h2>
//                         <p className="text-lg mb-4">{course.description}</p>
//                         <ReactPlayer 
//                             url={course.preview_url} 
//                             controls 
//                             className="mb-4"
//                             width="100%"
//                         />
//                         <div className="bg-gray-800 p-4 rounded-lg mb-4">
//                             <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
//                             <div className="space-y-4">
//                                 {course.lectures.map(lecture => (
//                                     <div key={lecture.id} className="bg-gray-700 p-4 rounded-lg">
//                                         <h3 className="text-xl font-medium mb-2">{lecture.title}</h3>
//                                         <div className="space-y-2">
//                                             {lecture.lessons.map(lesson => (
//                                                 <div key={lesson.id} className="bg-gray-600 p-2 rounded-lg">
//                                                     <p className="text-sm">{lesson.title}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <button
//                             onClick={() => setRatingPopupOpen(true)}
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                             Rate and Comment
//                         </button>
//                     </div>
//                     {/* Right Column: Instructor Info and Related Courses */}
//                     <div className="md:w-1/3 md:pl-8">
//                         <div className="bg-gray-800 p-4 rounded-lg mb-4">
//                             <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
//                             <p>{course.author}</p>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-lg">
//                             <h2 className="text-2xl font-semibold mb-2">Related Courses</h2>
//                             <p>No related courses available.</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Comments Section */}
//                 <div className="bg-gray-800 p-4 rounded-lg mt-8">
//                     <h2 className="text-2xl font-semibold mb-4">Comments</h2>
//                     <div className="space-y-4">
//                         {comments.map(comment => (
//                             <div key={comment.id} className="bg-gray-700 p-4 rounded-lg flex items-center">
//                                 <img
//                                     src={comment.profile_image}
//                                     alt={comment.username}
//                                     className="w-10 h-10 rounded-full mr-4"
//                                 />
//                                 <div className="flex-1">
//                                     <div className="flex justify-between">
//                                         <p className="text-sm font-medium">{comment.username}</p>
//                                         <p className="text-sm">{comment.rating} Stars</p>
//                                     </div>
//                                     <p className="mt-2 text-sm">{comment.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <RatingPopup
//                 open={isRatingPopupOpen}
//                 handleClose={() => setRatingPopupOpen(false)}
//                 handleSubmit={handleRatingSubmit}
//             />
//         </div>
//     );
// };

// export default CourseOverview;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getCourseById, getCourseComments, postCourseComment } from '../services/CourseService';
import RatingPopup from './RatingPopup';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

const CourseOverview = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [comments, setComments] = useState([]);
    const [isRatingPopupOpen, setRatingPopupOpen] = useState(false);
    const [activeLecture, setActiveLecture] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseById(id);
                setCourse(data);
                console.log(data);
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

    if (!course) {
        return <p>Loading course details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white mb-10 pb-20">
            {/* Header Image */}
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
            </div>

            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Right Column: Instructor Info and Related Courses */}
                    <div className="md:w-1/3 md:pl-8">
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                            <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
                            <p>{course.author}- {course.preview_url}</p>
                        </div>
                        
                    </div>
                    {/* Left Column: Course Content */}
                    <div className="md:w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                        <p className="text-lg mb-4">{course.description}</p>
                        
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
                                                <FaCaretDown className="ml-2" />
                                            ) : (
                                                <FaCaretRight className="ml-2" />
                                            )}
                                        </button>
                                        {activeLecture === lecture.id && (
                                            <div className="bg-gray-600 p-4 rounded-b-lg">
                                                {lecture.lessons.map(lesson => (
                                                    <div key={lesson.id} className="p-2 rounded-lg">
                                                        <p className="text-sm">{lesson.title}</p>
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
    );
};

export default CourseOverview;
