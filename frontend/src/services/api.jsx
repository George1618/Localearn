import axios from 'axios';
import firebase from './firebaseConfig';
import 'firebase/auth';

const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      console.log('Token JWT:', token);

      const response = await axios.post(`${API_URL}/login`, {}, {
          headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', response.data);

      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.error || error.message);
  }
};

export const signup = async (email, password, username, isTeacher) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password, username, isTeacher });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const checkAuth = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/userData`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const updateUserData = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/userData`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getExercicio = async () => {
  try {
    const response = await axios.get(`${API_URL}/exercicio`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};