import { useContext, useState } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

import AuthContext from "../../contexts/auth";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";

const s = strings.login;

export default function Login({ navigation }) {

    // para autenticação com backend, usar apenas setUser
    const {_, setUser} = useContext(AuthContext);

    // para os campos de preenchimento
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        // usado apenas pré-conexão com backend; remover após conexão
        const user = {name: username, isTeacher: false}
        // autenticar usando os states username e password 
        // Se der certo:
        setUser(user);
    }

    function navToSignup() {
        navigation.push(strings.routes.signup);
    }

    return (
    <View>
        <LNI
            label={s.labelUser}
            value={username}
            onEdit={setUsername} />
        <LPI
            label={s.labelPassword}
            isNew={false}
            value={password}
            onEdit={setPassword} />
        
        <Text>
            { s.textSignupLine }
            <Pressable onPress={navToSignup}>
                <Text style={styles.toSignup}>{s.textSignup}</Text>
            </Pressable>
        </Text>
        
        <ActionButton text={s.buttonLogin} action={login} />
    </View>
    );
}

const styles = StyleSheet.create({
    toSignup: {
        color: '#F03030'
    }
})