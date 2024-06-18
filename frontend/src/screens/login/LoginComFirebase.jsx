import { useContext, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";

import AuthContext from "../../contexts/auth";
import { auth } from "../../services/firebaseConfig";

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

    async function login() {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            setUser({ name: user.displayName || user.email, isTeacher: false });
            console.log('Usuário logado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
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
                action={login}
                style={styles.submit_button}
                textStyle={styles.submit_button_text}
            />
        </View>
    );
}