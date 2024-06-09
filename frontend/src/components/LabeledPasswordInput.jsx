import { Text, TextInput } from "react-native";
import StyledText from "./StyledText";
import colors from "../assets/colors";

export default function LabeledPasswordInput({ label, isNew, value, onEdit, validation=() => "" }) {
    return (<>
        <StyledText text={label} />
        <StyledText text={validation()} />
        <TextInput 
            style={{color: colors.white, backgroundColor: colors.secondary}}
            textContentType={isNew ? 'newPassword' : 'password'}
            secureTextEntry={true}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}