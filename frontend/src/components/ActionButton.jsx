import { Button, StyleSheet } from "react-native";
import colors from "../assets/colors";

export default function ActionButton({text, action}) {
    return (
        <Button style={style} onPress={action} title={text}>{text}</Button>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: colors.neutral2,
        color: colors.black
    }
}).button;