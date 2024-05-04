import {StyleSheet, View, Text, Pressable} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

export default function Home({ navigation }) {
    return (
        <View id="home" style={styles.home}>
            <View id="header">
                <Pressable><Text>Localearn</Text></Pressable>
            </View>
            <NavigationContainer>
                <HomeStack.Navigator>
                    <HomeStack.Screen name='Main' component={Main} />
                    <HomeStack.Screen name='Profile' component={Profile} />
                    <HomeStack.Screen name='Lessons' component={Lessons} />
                    <HomeStack.Screen name='Statistics' component={Statistics} />
                    <HomeStack.Screen name='Locations' component={Locations} />
                </HomeStack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        width: '100%',
        heigh: '100%'
    }
})