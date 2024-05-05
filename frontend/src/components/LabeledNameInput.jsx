import { Text, TextInput } from "react-native";

export default function LabeledNameInput({ label, value, onEdit }) {
    return (<>
        <Text>{label}</Text>
        <TextInput 
            textContentType={'username'}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}