import axios from 'axios';
import firebase from './firebaseConfig';
import 'firebase/auth';

const API_URL_AUTH = 'http://localhost:3000/auth';
const API_URL_USER = 'http://localhost:3000/user';
const API_URL_LOCALEARN = 'http://localhost:3000/localearn';

export const login = async (email, password) => {
  try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      console.log('Token JWT:', token);

      const response = await axios.post(`${API_URL_AUTH}/login`, {}, {
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
    const response = await axios.post(`${API_URL_AUTH}/signup`, { email, password, username, isTeacher });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const checkAuth = async (token) => {
  try {
    const response = await axios.get(`${API_URL_AUTH}/checkAuth`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL_USER}/userData`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const updateUserData = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL_USER}/userData`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getExercicio = async () => {
  try {
    const response = await axios.get(`${API_URL_LOCALEARN}/exercicio`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getLocais = async () => {
  try {
    const response = await axios.get(`${API_URL_LOCALEARN}/locais`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const sendAnswersResult = async (token, correctAnswers, wrongAnswers) => {
  try {
    const response = await axios.post(`${API_URL_LOCALEARN}/answersResult`, {
      correctAnswers,
      wrongAnswers
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};