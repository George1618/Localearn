import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { auth } from '../services/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        if (userToken && userData) {
          setUser({ token: userToken, userData: JSON.parse(userData) });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const userToken = await user.getIdToken();
          const userData = await AsyncStorage.getItem('userData');
          setUser({ token: userToken, userData: JSON.parse(userData) });
        } catch (error) {
          console.error('Erro ao obter token de usuário:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function to unsubscribe from onAuthStateChanged listener
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading ? children : <ActivityIndicator size="large" color="#0000ff" />}
    </AuthContext.Provider>
  );
};

export default AuthContext;