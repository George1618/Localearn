import {StyleSheet, View, Text, Pressable, Image} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './main/Main';
import Profile from './profile/Profile';
import Lessons from './lessons/Lessons';
import Statistics from './statistics/Statistics';
import Locations from './locations/Locations';

import strings from '../../assets/strings';
import colors from '../../assets/colors';
import Header from './header/Header';
import { useContext } from 'react';
import AuthContext from '../../contexts/auth';

const HomeStack = createNativeStackNavigator();

const {home, routes} = strings;

export default function Home({ navigation }) {
    const {_, setUser} = useContext(AuthContext);

    // funções usadas no header
    function navToMain() { navigation.navigate(routes.home); }
    function navToProfile() {  navigation.push(routes.profile); }
    function navUnloggedToLogin() {
        // log out do usuário; TODO: fazer com o backend
        setUser(null);
    }

    return (
        <View style={styles.home}>
            <HomeStack.Navigator screenOptions={{header: () => 
                <Header titleNav={navToMain} menu={[
                    {title: home.header.optionProfile, action: navToProfile},
                    {title: home.header.optionLogOut, action: navUnloggedToLogin}
                ]} />
            }}>
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
        flex: 1,
        backgroundColor: colors.neutral1,
        color: colors.secondary
    }
})