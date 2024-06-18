import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { auth, db } from "../../services/firebaseConfig";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";
import StyledText from "../../components/StyledText";
import styles from "../../assets/styles";

const s = strings.signup;

export default function Signup({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    const [validation, setValidation] = useState("");
    useEffect(() => {
        let invalidText = confirmPassword !== "" && confirmPassword !== password ? s.invalidPassword : "";
        setValidation(invalidText);
    }, [confirmPassword]);

    async function signup() {
        if (password !== confirmPassword) {
            setValidation(s.invalidPassword);
            return;
        }
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(username, password);
            const user = userCredential.user;

            await user.updateProfile({
                displayName: username
            });

            const userData = {
                email: user.email,
                nome: username,
            };

            const collection = isTeacher ? 'professores' : 'alunos';
            await db.collection(collection).doc(user.uid).set(userData);

            navigation.navigate(strings.routes.login);
        } catch (error) {
            console.error('Erro ao cadastrar:', error.message);
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
                <StyledText text={s.pickerLabel} style={styles.signup_picker_text} />
                <Picker
                    selectedValue={isTeacher}
                    onValueChange={value => setIsTeacher(value)}
                    style={styles.signup_picker}
                >
                    <Picker.Item label={s.pickerStudent} style={styles.signup_picker_item} value={false} />
                    <Picker.Item label={s.pickerTeacher} style={styles.signup_picker_item} value={true} />
                </Picker>
            </View>

            <ActionButton
                text={s.buttonSignup}
                action={signup}
                style={styles.submit_button}
                textStyle={styles.submit_button_text}
            />
        </View>
    );
}