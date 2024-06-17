import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import colors from './src/assets/colors';
import AuthContext from './src/contexts/auth';
import { auth } from './src/services/firebaseConfig';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';
import strings from './src/assets/strings';

const { routes } = strings;
const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  return (
    <View style={styles.app}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: styles.content
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

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: colors.neutral2
  }
});

export default App;
