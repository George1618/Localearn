import React from 'react';

import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';

import strings from './src/assets/strings';
const { routes } = strings;

// Pilha de navegação para o App principal.
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={routes.home} component={Home} />
        <Stack.Screen name={routes.login} component={Login} />
        <Stack.Screen name={routes.signup} component={Signup} />
        <StatusBar translucent={false} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
