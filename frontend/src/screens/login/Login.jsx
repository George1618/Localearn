import { useContext, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";

import AuthContext from "../../contexts/auth";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";
import styles from "../../assets/styles";
import StyledText from "../../components/StyledText";

const s = strings.login;

export default function Login({ navigation }) {

    // para autenticação com backend, usar apenas setUser
    const {_, setUser} = useContext(AuthContext);

    // para os campos de preenchimento
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        // TODO: remover exemplo abaixo para puxar do Firebase
        const user = {name: username, isTeacher: false}
        setUser(user);
    }

    function navToSignup() {
        navigation.push(strings.routes.signup);
    }

    return (
    <View style={styles.body}>
        <StyledText text={strings.appName} style={styles.non_home_header} />
        <LNI
            label={s.labelUser}
            value={username}
            onEdit={setUsername} />
        <LPI
            label={s.labelPassword}
            isNew={false}
            value={password}
            onEdit={setPassword} />
        
        <View style={styles.login_signup}>
            <StyledText text={ s.textSignupLine+"   " } style={styles.login_signup_text} />
            <Pressable onPress={navToSignup}>
                <StyledText text={s.textSignup} style={styles.login_signup_link} />
            </Pressable>
        </View>
        
        <ActionButton text={s.buttonLogin} action={login} 
            style={styles.submit_button} textStyle={styles.submit_button_text} />
    </View>
    );
}