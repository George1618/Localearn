import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import colors from './src/assets/colors';
import AuthContext, { AuthProvider } from './src/contexts/AuthContext';
import { auth } from './src/services/firebaseConfig';
import firebase from './src/services/firebaseConfig';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';
import strings from './src/assets/strings';

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

  if (initializing) return <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />;

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
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;