import { useContext, useState } from "react";
import { Pressable, View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from "../../contexts/AuthContext";
import { login } from "../../services/api";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";
import styles from "../../assets/styles";
import StyledText from "../../components/StyledText";

const s = strings.login;

export default function Login({ navigation }) {
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha o email e a senha.');
            return;
        }

        setLoading(true);

        try {
            const data = await login(email, password);
            // Armazena o token e os dados do usuário no contexto e/ou AsyncStorage
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userData', JSON.stringify(data.userData));
            setUser({ token: data.token, userData: data.userData });
            console.log('Usuário logado com sucesso!');
            navigation.navigate(strings.routes.home);
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    }

    function navToSignup() {
        navigation.push(strings.routes.signup);
    }

    return (
        <View style={styles.body}>
            <StyledText text={strings.appName} style={styles.non_home_header} />
            <LNI
                label={s.labelUser}
                value={email}
                onEdit={setEmail}
            />
            <LPI
                label={s.labelPassword}
                isNew={false}
                value={password}
                onEdit={setPassword}
            />
        
            <View style={styles.login_signup}>
                <StyledText text={s.textSignupLine + "   "} style={styles.login_signup_text} />
                <Pressable onPress={navToSignup}>
                    <StyledText text={s.textSignup} style={styles.login_signup_link} />
                </Pressable>
            </View>
        
            <ActionButton
                text={s.buttonLogin}
                action={handleLogin}
                style={styles.submit_button}
                textStyle={styles.submit_button_text}
            />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}