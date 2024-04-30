import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
            <StatusBar translucent={false} />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0
    },
});
