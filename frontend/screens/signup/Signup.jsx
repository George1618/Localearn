import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Signup({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    function signup() {
        /* cadastrar usuário com os states: username, password, isTeacher */
        // após sucesso:
        navigation.navigate('Login')
    }

    return (<View id="signup">
        <Text>Nome de usuário</Text>
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
        <Text>Confirmar senha</Text>
        <TextInput 
            secureTextEntry={true} 
            textContentType={'password'} 
            id="confirmPassword"
            defaultValue={confirmPassword}
            onChangeText={value => setConfirmPassword(value)} />
        <Text>Sou:</Text>
        <Picker selectedValue={isTeacher} onValueChange={value => setIsTeacher(value)}>
            <Picker.Item label="Aluno" value={false} />
            <Picker.Item label="Professor" value={true}/>
        </Picker>
        <Button onPress={signup}>Cadastrar</Button>
    </View>);
}