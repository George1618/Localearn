import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './main/Main';
import Profile from './profile/Profile';
import Lessons from './lessons/Lessons';
import Statistics from './statistics/Statistics';
import Locations from './locations/Locations';

import strings from '../../assets/strings';
import Header from './header/Header';
import AuthContext from '../../contexts/AuthContext';
import { auth } from '../../services/firebaseConfig';
import styles from '../../assets/styles';
import LessonsTeacher from './lessons/LessonsTeacher';
import StatisticsTeacher from './statistics/StatisticsTeacher';

const HomeStack = createNativeStackNavigator();
const {home, routes} = strings;

export default function Home({ navigation }) {
    const { setUser} = useContext(AuthContext);

    // funções usadas no header
    function navToMain() { navigation.navigate(routes.home); }
    function navToProfile() { navigation.push(routes.profile); }
    async function navUnloggedToLogin() {
        // Log out do usuário
        try {
            await auth().signOut(); // Efetua logout do Firebase
            setUser(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error.message);
        }
    }

    return (
        <View style={styles.home}>
            <Header titleNav={navToMain} menu={[
                    { title: home.header.optionProfile, action: navToProfile },
                    { title: home.header.optionLogOut, action: navUnloggedToLogin }
                ]} />
            <HomeStack.Navigator screenOptions={{
                header: () => null, headerShown: false, contentStyle: styles.main_container }}
            >
                <HomeStack.Screen name={routes.main} component={Main} />
                <HomeStack.Screen name={routes.profile} component={Profile} />
                <HomeStack.Screen name={routes.lessons} component={Lessons} />
                <HomeStack.Screen name={routes.lessonsTeacher} component={LessonsTeacher} />
                <HomeStack.Screen name={routes.statistics} component={Statistics} />
                <HomeStack.Screen name={routes.statisticsTeacher} component={StatisticsTeacher} />
                <HomeStack.Screen name={routes.locations} component={Locations} />
            </HomeStack.Navigator>
        </View>
    );
}