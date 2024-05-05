import { Button, StyleSheet } from "react-native";

export default function ActionButton({text, action}) {
    return (
        <Button style={style} onPress={action}>{text}</Button>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: '#F03030',
        color: "#000000"
    }
}).button;