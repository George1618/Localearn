import { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import LNI from "../../../components/LabeledNameInput";
import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import AuthContext from "../../../contexts/auth";
import styles from "../../../assets/styles";

const s = strings.home.profile;

export default function Profile({ navigation }) {
    const {user, setUser} = useContext(AuthContext);

    // para a edição
    const [username, setUsername] = useState("");
    let originalName = user?.name || ""
    // removida a edição de senha; dependendo de como o backend trata ela, o campo pode voltar
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {setUsername(user?.name || ""); originalName = user?.name || ""}, [user])

    function updateUser() {
        setUser({...user, name: username})
        // chamada ao backend para fazer as alterações usando os states acima
        // se der certo alterar:
        setIsEditing(false);
    }

    function setEdit() {
        // para maior segurança, mostrar diálogo pedindo pra confirmar senha atual
        setIsEditing(true);
    }

    return (
        <View style={styles.main_container}>
            <StyledText text={s.headerProfile} style={styles.main_profile_header} />
            <LNI 
                label={s.labelUsername}
                value={username}
                onEdit={setUsername}
                editable={isEditing} />
            <View style={styles.main_profile_button_container}>
                {isEditing ? <ActionButton 
                    text={s.buttonConfirm}
                    action={updateUser}
                    style={{...styles.submit_button, ...styles.main_profile_button}}
                    textStyle={{...styles.submit_button_text, ...styles.main_profile_button_text}}
                /> : 
                <ActionButton
                    text={s.buttonEdit} 
                    action={setEdit}
                    style={{...styles.submit_button, ...styles.main_profile_button_non_edit}}
                    textStyle={styles.submit_button_text} />
                }
                { isEditing ? <ActionButton
                    text={s.buttonCancel}
                    action={() => {setIsEditing(false); setUsername(originalName)}}
                    style={{...styles.submit_button, ...styles.main_profile_button}}
                    textStyle={{...styles.submit_button_text, ...styles.main_profile_button_text}} /> 
                    : <></>
                }
            </View>
        </View>
    );
}