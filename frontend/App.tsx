import React, { useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';

import strings from './src/assets/strings';
import { Dimensions, StyleSheet, View } from 'react-native';
import colors from './src/assets/colors';
const { routes } = strings;

// Pilha de navegação para o App principal.
const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  // TODO: obter user com o backend
  const [user, setUser] = useState(null);


  return (
    <View style={styles.app}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName={user===null ? routes.login : routes.home} 
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={routes.home} component={Home} />
          <Stack.Screen name={routes.login} component={Login} />
          <Stack.Screen name={routes.signup} component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
})

export default App;
