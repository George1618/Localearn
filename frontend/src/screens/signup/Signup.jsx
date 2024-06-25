import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signup } from "../../services/api";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";
import StyledText from "../../components/StyledText";
import styles from "../../assets/styles";

const s = strings.signup;

export default function Signup({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    const [validation, setValidation] = useState("");

    useEffect(() => {
        let invalidText = confirmPassword !== "" && confirmPassword !== password ? s.invalidPassword : "";
        setValidation(invalidText);
    }, [confirmPassword, password]);

    async function handleSignup() {
        if (password !== confirmPassword) {
            setValidation(s.invalidPassword);
            return;
        }
        try {
            await signup(email, password, username, isTeacher);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            navigation.navigate(strings.routes.login);
        } catch (error) {
            console.error('Erro ao cadastrar: ', error.message);
            Alert.alert('Erro', error.message);
        }
    }

    return (
        <View>
            <StyledText text={strings.appName} style={styles.non_home_header} />
            <LNI 
                label={s.labelUsername}
                value={username}
                onEdit={setUsername} 
            />
            <LNI 
                label={s.labelEmail}
                value={email}
                onEdit={setEmail} 
            />
            <LPI
                label={s.labelPassword}
                isNew={false}
                value={password}
                onEdit={setPassword} 
            />
            <LPI
                label={s.labelConfirmPassword}
                isNew={true}
                value={confirmPassword}
                onEdit={setConfirmPassword}
                validation={validation} 
            />
            <View style={styles.signup_picker_container}>
                <StyledText text={s.pickerLabel} style={styles.signup_picker_text}/>
                <Picker 
                    selectedValue={isTeacher} 
                    onValueChange={value => setIsTeacher(value)} 
                    style={styles.signup_picker}>
                    <Picker.Item label={s.pickerStudent} style={styles.signup_picker_item} value={false}/>
                    <Picker.Item label={s.pickerTeacher} style={styles.signup_picker_item} value={true}/>
                </Picker>
            </View>

            <ActionButton 
                text={s.buttonSignup} 
                action={handleSignup}
                style={styles.submit_button} 
                textStyle={styles.submit_button_text} 
            />
        </View>
    );
}