import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import LNI from "../../../components/LabeledNameInput";
import LPI from "../../../components/LabeledPasswordInput";
import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import AuthContext from "../../../contexts/auth";

const s = strings.home.profile;

export default function Profile({ navigation }) {
    const {user, setUser} = useContext(AuthContext);

    // para a edição
    const [username, setUsername] = useState("");
    // removida a edição de senha; dependendo de como o backend trata ela, o campo pode voltae
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {setUsername(user?.name || "")}, [user])

    function updateUser() {
        setUser({...user, name: username})
        // chamada ao backend para fazer as alterações usando os states acima
        // se der certo alterar:
        setIsEditing(false);
    }

    function setEdit() {
        // para maior segurança, mostrar diálogo pedindo pra confirmar senha atual
        // TODO: criar diálogo de alerta
        setIsEditing(true);
    }

    return (
        <View>
            <StyledText text={s.headerProfile} />
            <LNI 
                label={s.labelUsername}
                value={username}
                onEdit={setUsername} />
            <ActionButton
                text={isEditing ? s.buttonConfirm : s.buttonEdit} 
                action={isEditing ? updateUser : setEdit} />
        </View>
    );
}