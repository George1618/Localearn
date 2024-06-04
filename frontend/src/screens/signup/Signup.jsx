import { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import LNI from "../../components/LabeledNameInput";
import LPI from "../../components/LabeledPasswordInput";
import ActionButton from "../../components/ActionButton";

import strings from "../../assets/strings";
import StyledText from "../../components/StyledText";
import colors from "../../assets/colors";

const s = strings.signup;

export default function Signup({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);

    function signup() {
        /* cadastrar usuário com os states: username, password, isTeacher */
        // após sucesso, ir para tela de login
        navigation.navigate(strings.routes.login);
    }

    return (<View>
        <LNI 
            label={s.labelUsername}
            value={username}
            onEdit={setUsername} />
        <LPI
            label={s.labelPassword}
            isNew={false}
            value={password}
            onEdit={setPassword} />
        <LPI
            label={s.labelConfirmPassword}
            isNew={true}
            value={confirmPassword}
            onEdit={setConfirmPassword} />

        <StyledText text={s.pickerLabel}/>
        <Picker selectedValue={isTeacher} onValueChange={value => setIsTeacher(value)} 
            style={{color: colors.black}}>
            <Picker.Item label={s.pickerStudent} value={false} />
            <Picker.Item label={s.pickerTeacher} value={true}/>
        </Picker>

        <ActionButton text={s.buttonSignup} action={signup} />
    </View>);
}