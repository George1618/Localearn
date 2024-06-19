import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';

import { View, ActivityIndicator } from 'react-native';
import AuthContext from './src/contexts/auth';
import strings from './src/assets/strings';
import styles from './src/assets/styles';

import { auth } from './src/services/firebaseConfig';
import firebase from './src/services/firebaseConfig';

const { routes } = strings;
const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

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