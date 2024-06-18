import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading ? children : <ActivityIndicator size="large" color="#0000ff" />}
    </AuthContext.Provider>
  );
};

export default AuthContext;