import axios from 'axios';
import { auth } from '../services/firebaseConfig';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    console.log('Token JWT:', token);

    const response = await axiosInstance.post('/auth/login');
    console.log('Response:', response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const signup = async (email, password, username, isTeacher) => {
  try {
    const response = await axiosInstance.post('/auth/signup', { email, password, username, isTeacher });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/checkAuth');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get('/user/userData');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const updateUserData = async (userData) => {
  try {
    const response = await axiosInstance.put('/user/userData', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getExercicio = async () => {
  try {
    const response = await axiosInstance.get('/localearn/exercicio');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getRecentLocations = async () => {
  try {
    const response = await axiosInstance.get('/user/recentLocations');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getDesempenho = async () => {
  try {
    const response = await axiosInstance.get('/user/desempenho');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const sendAnswersResult = async (correctAnswers, wrongAnswers) => {
  try {
    const response = await axiosInstance.post('/localearn/answersResult', { correctAnswers, wrongAnswers });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const updateDesempenho = async (categoria, acerto) => {
  try {
    const response = await axiosInstance.post('/user/updateDesempenho', { categoria, acerto });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const updateLocalizacao = async (location) => {
  try {
    const response = await axiosInstance.post('/localizacao', { latitude: location.latitude, longitude: location.longitude });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};