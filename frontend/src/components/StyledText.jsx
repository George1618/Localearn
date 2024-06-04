import { Text, StyleSheet } from "react-native";
import colors from "../assets/colors";

export default function StyledText({text}) {
    return (
        <Text style={style}>{text}</Text>
    )
}

const style = StyleSheet.create({
    text: {
        color: colors.black
    }
}).text;