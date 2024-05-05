import { Button, StyleSheet } from "react-native";

export default function ActionButton({text, action}) {
    return (
        <Button style={style} onPress={action} title={text}>{text}</Button>
    )
}

const style = StyleSheet.create({
    button: {
        width: "80%",
        height: "50px",
        backgroundColor: '#F03030',
        color: "#000000"
    }
}).button;