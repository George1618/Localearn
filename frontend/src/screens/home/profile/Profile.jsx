import { useContext, useEffect, useState } from "react";
import { View, Alert } from "react-native";

import LNI from "../../../components/LabeledNameInput";
import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import AuthContext from "../../../contexts/AuthContext";
import styles from "../../../assets/styles";

import { getUserData, updateUserData } from "../../../services/api";

const s = strings.home.profile;

export default function Profile({ navigation }) {
    const { user } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    async function fetchUserData() {
        try {
            const token = user.token;
            const data = await getUserData(token);
            const userData = data.userData;

            setEmail(userData.email);
            setUsername(userData.nome);
        } catch (error) {
            console.error('Erro ao recuperar dados do usuário:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user])

    async function updateUser() {
        try {
            const token = user.token;
            const userDataToUpdate = {
                email: email,
                nome: username
            };

            await updateUserData(token, userDataToUpdate);
            Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error.message);
            Alert.alert('Erro', 'Não foi possível atualizar os dados. Tente novamente mais tarde.');
        }
    };

    function setEdit() {
        setIsEditing(true);
    }

    return (
        <View style={styles.main_container}>
            <StyledText text={s.headerProfile} style={styles.main_header} />
            <LNI 
                label={s.labelUsername}
                value={username}
                onEdit={setUsername}
                editable={isEditing} 
            />
            <LNI
                label={s.labelEmail}
                value={email}
                onEdit={setEmail}
                editable={isEditing}
            />
            <View style={styles.main_profile_button_container}>
                {isEditing ? (
                    <ActionButton 
                        text={s.buttonConfirm}
                        action={updateUser}
                        style={{ ...styles.submit_button, ...styles.main_profile_button }}
                        textStyle={{ ...styles.submit_button_text, ...styles.main_profile_button_text }}
                    /> 
                ) : ( 
                    <ActionButton
                        text={s.buttonEdit} 
                        action={setEdit}
                        style={{ ...styles.submit_button, ...styles.main_profile_button_non_edit }}
                        textStyle={styles.submit_button_text} 
                    />
                )}
                {isEditing && (
                    <ActionButton
                        text={s.buttonCancel}
                        action={() => {
                            setIsEditing(false); 
                            setUsername(user?.name || "");
                            setEmail(user?.email || "");
                        }}
                        style={{ ...styles.submit_button, ...styles.main_profile_button }}
                        textStyle={{ ...styles.submit_button_text, ...styles.main_profile_button_text }}
                    /> 
                )}
            </View>
        </View>
    );
}