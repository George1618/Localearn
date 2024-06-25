import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';

import strings from './src/assets/strings';
import AuthContext, { AuthProvider } from './src/contexts/AuthContext';
import { LocalProvider } from './src/contexts/LocalContext';
import styles from './src/assets/styles';

const { routes } = strings;

// Pilha de navegação para o App principal.
const Stack = createNativeStackNavigator();

interface User {
  token: string;
  userData: any;
}

function App(): React.JSX.Element {
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

  return initializing ? (
    <ActivityIndicator size="large" style={styles.loadingIndicator} />
  ) : (
    <View style={styles.body}>
      <AuthProvider>
        <LocalProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: () => null,
                headerShown: false,
                contentStyle: styles.app_content,
              }}>
              {user === null ? (
                <>
                  <Stack.Screen name={routes.login} component={Login} />
                  <Stack.Screen name={routes.signup} component={Signup} />
                </>
              ) : (
                <Stack.Screen name={routes.home} component={Home} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </LocalProvider>
      </AuthProvider>
    </View>
  );
}

export default App;