import React, { useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/login/Login';
import Signup from './src/screens/signup/Signup';
import Home from './src/screens/home/Home';

import strings from './src/assets/strings';
import {StyleSheet,  View } from 'react-native';
import colors from './src/assets/colors';
import AuthContext from './src/contexts/auth';
import styles from './src/assets/styles';

const { routes } = strings;

// Pilha de navegação para o App principal.
const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  const [user, setUser] = useState(null);

  return (
    <View style={styles.body}>
      <AuthContext.Provider value={{user, setUser}}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{header: () => null, headerShown: false,
              contentStyle: styles.app_content
            }}>
              {
                user===null ? 
                <>
                  <Stack.Screen name={routes.login} component={Login} />
                  <Stack.Screen name={routes.signup} component={Signup} />
                </>
                  :
                <Stack.Screen name={routes.home} component={Home} />}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

export default App;
