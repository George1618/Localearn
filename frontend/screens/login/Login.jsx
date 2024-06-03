import { useState } from "react";
import { StyleSheet, Button, Pressable, Text, TextInput, View } from "react-native";

export default function Login({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        /* autenticar usando os states: username e password */
    }

    function navToSignup() {
        navigation.navigate('Signup');
    }

    return (<View>
        <Text>Usuário</Text>
        <TextInput 
            textContentType={'username'} 
            id="username"
            defaultValue={username}
            onChangeText={value => setUsername(value)} />
        <Text>Senha</Text>
        <TextInput 
            secureTextEntry={true} 
            textContentType={'newPassword'} 
            id="password"
            defaultValue={password}
            onChangeText={value => setPassword(value)} />
        <Text>
            Não tem conta? 
            <Pressable onPress={navToSignup}>
                <Text style={styles.toSignup}>Cadastre-se</Text>
            </Pressable>
        </Text>
        
        <Button onPress={login}>Login</Button>
    </View>);
}

const styles = StyleSheet.create({
    toSignup: {
        color: '#F03030'
    }
})