import { Text, TextInput } from "react-native";
import StyledText from "./StyledText";
import colors from "../assets/colors";

export default function LabeledPasswordInput({ label, isNew, value, onEdit }) {
    return (<>
        <StyledText text={label} />
        <TextInput 
            style={{color: colors.white, backgroundColor: colors.secondary}}
            textContentType={isNew ? 'newPassword' : 'password'}
            secureTextEntry={true}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}