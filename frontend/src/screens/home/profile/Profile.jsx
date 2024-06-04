import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LNI from "../../../components/LabeledNameInput";
import LPI from "../../../components/LabeledPasswordInput";
import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";

const s = strings.home.profile;

export default function Profile({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // obter usuário por props, por context/redux/etc., ou por chamada ao backend

    function updateUser() {
        // chamada ao backend para fazer as alterações usando os states acima
        // se der certo alterar:
        setIsEditing(false);
    }

    function setEdit() {
        // para maior segurança, mostrar diálogo pedindo pra confirmar senha atual
        setIsEditing(true);
    }

    return (
        <View>
            <StyledText text={s.headerProfile} />
            <LNI 
                label={s.labelUsername}
                value={username}
                onEdit={setUsername} />
            <LPI
                label={s.labelPassword}
                value={password}
                onEdit={setPassword} />
            <ActionButton
                text={isEditing ? s.buttonConfirm : s.buttonEdit} 
                action={isEditing ? updateUser : setEdit} />
        </View>
    );
}