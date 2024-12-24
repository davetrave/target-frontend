import api from './AuthService';



export const getUserData = async () => {
  try {
    const response = await api.get('/api/user/data/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    return error.response.data
  }
};

