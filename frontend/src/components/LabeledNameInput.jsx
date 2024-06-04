import { Text, TextInput } from "react-native";
import StyledText from "./StyledText";
import colors from "../assets/colors";

export default function LabeledNameInput({ label, value, onEdit }) {
    return (<>
        <StyledText text={label} />
        <TextInput 
            style={{color: colors.white, backgroundColor: colors.secondary}}
            textContentType={'username'}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}