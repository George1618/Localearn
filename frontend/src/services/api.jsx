import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signup = async (email, password, username, isTeacher) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password, username, isTeacher });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const checkAuth = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/userData`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateUserData = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/userData`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};