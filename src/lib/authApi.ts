import axiosInstance from './axiosInstance';

export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/signup', userData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};