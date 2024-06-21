import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';
import AuthContext from './src/contexts/AuthContext';
import strings from './src/assets/strings';
import styles from './src/assets/styles';

const { routes } = strings;
const Stack = createNativeStackNavigator();

interface User {
  token: string;
  userData: any;
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        if (userToken && userData) {
          setUser({ token: userToken, userData: JSON.parse(userData) });
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao verificar autenticação:', error.message);
        } else {
          console.error('Erro desconhecido ao verificar autenticação:', error);
        }
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };

    checkAuthentication();
  }, []);

  if (initializing) return <ActivityIndicator size="large" style={styles.loadingIndicator} />;

  return (
    <View style={styles.body}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: styles.app_content
            }}>
            {user ? (
              <Stack.Screen name={routes.home} component={Home} />
            ) : (
              <>
                <Stack.Screen name={routes.login} component={Login} />
                <Stack.Screen name={routes.signup} component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

export default App;