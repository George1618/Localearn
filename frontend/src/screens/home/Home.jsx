import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './main/Main';
import Profile from './profile/Profile';
import Lessons from './lessons/Lessons';
import Statistics from './statistics/Statistics';
import Locations from './locations/Locations';

import strings from '../../assets/strings';
import Header from './header/Header';
import AuthContext from '../../contexts/auth';
import { auth } from '../../services/firebaseConfig';
import styles from '../../assets/styles';

const HomeStack = createNativeStackNavigator();
const { home, routes } = strings;

export default function Home({ navigation }) {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigation.replace(routes.login); // Redireciona para a tela de login se o usuário não estiver logado
        }
    }, [user]);

    // funções usadas no header
    function navToMain() { navigation.navigate(routes.home); }
    function navToProfile() { navigation.push(routes.profile); }
    async function navUnloggedToLogin() {
        // Log out do usuário
        try {
            await auth().signOut(); // Efetua logout do Firebase
            setUser(null);
            navigation.replace(routes.login); // Redireciona para a tela de login após o logout
        } catch (error) {
            console.error('Erro ao fazer logout:', error.message);
        }
    }

    if (!user) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Mostra um indicador de carregamento enquanto verifica a autenticação
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
                <HomeStack.Screen name={routes.statistics} component={Statistics} />
                <HomeStack.Screen name={routes.locations} component={Locations} />
            </HomeStack.Navigator>
        </View>
    );
}
