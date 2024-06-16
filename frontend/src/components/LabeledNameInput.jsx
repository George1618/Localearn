import { Text, TextInput } from "react-native";
import StyledText from "./StyledText";
import styles from "../assets/styles";

export default function LabeledNameInput({ label, value, onEdit, editable=true }) {
    return (<>
        <StyledText text={label} style={styles.labeled_name_text} />
        <TextInput 
            style={styles.labeled_name_input}
            textContentType={'username'}
            editable={editable}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}