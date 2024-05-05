import { Text, TextInput } from "react-native";

export default function LabeledPasswordInput({ label, isNew, value, onEdit }) {
    return (<>
        <Text>{label}</Text>
        <TextInput 
            textContentType={isNew ? 'newPassword' : 'password'}
            secureTextEntry={true}
            defaultValue={value}
            onChangeText={value => onEdit(value)} />
    </>)
}