import api from './AuthService';

export const addCourse = async (courseData) => {
  try {
    const response = await api.post('api/courses/', courseData);
    return response.data;
  } catch (error) {
    alert(error)
  }
};

export const getCourses = async () => {
  try {
    const response = await api.get('/api/courses/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data)
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`api/courses/${id}/`);
    return response.data;
  } catch(err) {
    console.log(err.response.data)
  }
  
};

export const getCourseComments = async (courseId) => {
  const response = await api.get(`api/courses/${courseId}/comments/`);
  return response.data;
};

export const postCourseComment = async (courseId, commentData) => {
  const response = await api.post(`api/courses/${courseId}/comments/`, commentData);
  return response.data;
};
