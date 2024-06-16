import { Text, StyleSheet } from "react-native";

export default function StyledText({text, style={}}) {
    return (
        <Text style={style}>{text}</Text>
    )
}