import {StyleSheet, View, Text, Pressable, Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './main/Main';
import Profile from './profile/Profile';
import Lessons from './lessons/Lessons';
import Statistics from './statistics/Statistics';
import Locations from './locations/Locations';

import strings from '../../assets/strings';

const HomeStack = createNativeStackNavigator();

const {routes} = strings;

export default function Home({ navigation }) {

    function navToProfile() {
        // TODO: Mudar navegação direta para usar o ProfileDialog
        navigation.push(routes.profile);
    }

    function navToMain() {
        navigation.navigate(routes.home);
    }

    return (
        <View style={styles.home}>
            <View>
                <Pressable onPress={navToMain}><Text>{strings.appName}</Text></Pressable>
                <View>
                    <Pressable onPress={navToProfile}>
                        <Text>{''}</Text>
                    </Pressable>
                </View>
            </View>
            
            <HomeStack.Navigator>
                <HomeStack.Screen name={routes.main} component={Main} />
                <HomeStack.Screen name={routes.profile} component={Profile} />
                <HomeStack.Screen name={routes.lessons} component={Lessons} />
                <HomeStack.Screen name={routes.statistics} component={Statistics} />
                <HomeStack.Screen name={routes.locations} component={Locations} />
            </HomeStack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        width: '100%',
        heigh: '100%',
        backgroundColor: "#000"
    }
})