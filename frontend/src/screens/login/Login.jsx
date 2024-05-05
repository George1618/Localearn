import { useState } from "react";
import { StyleSheet, Button, Pressable, Text, TextInput, View } from "react-native";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";

const s = strings.login;

export default function Login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        // autenticar usando os states username e password 
        // Se der certo:
        navigation.navigate(strings.routes.home);
    }

    function navToSignup() {
        navigation.navigate(strings.routes.login);
    }

    return (<View>
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
    </View>);
}

const styles = StyleSheet.create({
    toSignup: {
        color: '#F03030'
    }
})