import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { updateLocalizacao } from '../services/api';
import AuthContext from './AuthContext';

const LocalContext = createContext();

export const LocalProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Pega o usuário do AuthContext
  const [local, setLocal] = useState(null);

  useEffect(() => {
    const updateLocation = async () => {
      if (user) {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            throw new Error('Permissão de localização negada');
          }

          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          setLocal(coords);
          await updateLocalizacao(coords);
        } catch (error) {
          console.error('Erro ao atualizar localização:', error);
        }
      }
    };

    // Atualiza a localização imediatamente e depois a cada 2 minutos
    updateLocation();
    const intervalId = setInterval(updateLocation, 2 * 60 * 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <LocalContext.Provider value={{ local }}>
      {children}
    </LocalContext.Provider>
  );
};

export default LocalContext;