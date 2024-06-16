import { TextInput, View } from "react-native";
import StyledText from "./StyledText";
import styles from "../assets/styles";

export default function LabeledPasswordInput({ label, isNew, value, onEdit, validation="" }) {
    return (<>
        <View style={styles.labeled_password_text_container}>
            <StyledText text={label} style={styles.labeled_password_text} />
            <StyledText text={validation} style={validation==="" ? {display: 'none'} : styles.labeled_password_text_invalid } />
        </View>
        <TextInput 
            style={validation==="" ? styles.labeled_password_input : styles.labeled_password_input_invalid }
            textContentType={isNew ? 'newPassword' : 'password'}
            secureTextEntry={true}
            defaultValue={value}
            onChangeText={(value) => onEdit(value)} />
    </>)
}