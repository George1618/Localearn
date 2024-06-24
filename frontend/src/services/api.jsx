import axios from 'axios';
import firebase from './firebaseConfig';
import 'firebase/auth';

<<<<<<< HEAD
const API_URL_USER = 'http://localhost:3000/user';
const API_URL_AUTH = 'http://localhost:3000/auth';
=======
const API_URL_AUTH = 'http://localhost:3000/auth';
const API_URL_USER = 'http://localhost:3000/user';
>>>>>>> 849f230d7e30fec07c58a26fc8c7f0021965b5df
const API_URL_LOCALEARN = 'http://localhost:3000/localearn';

export const login = async (email, password) => {
  try {
<<<<<<< HEAD
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      console.log('Token JWT:', token);

      const response = await axios.post(`${API_URL_AUTH}/login`, {}, {
          headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Response:', response.data);
=======
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    console.log('Token JWT:', token); // Pra verificar se o token é exibido corretamente
    
    const response = await axios.post(`${API_URL_AUTH}/login`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Response:', response.data); // Pra verificar se a resposta do backend é recebida corretamente
>>>>>>> 849f230d7e30fec07c58a26fc8c7f0021965b5df

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
<<<<<<< HEAD
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

export const getLocais = async () => {
  try {
    const response = await axios.get(`${API_URL_LOCALEARN}/locais`);
=======
>>>>>>> 849f230d7e30fec07c58a26fc8c7f0021965b5df
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};