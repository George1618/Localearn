import { Pressable } from "react-native";
import StyledText from "./StyledText";

export default function ActionButton({text, action, style={}, textStyle={}}) {
    return (
        <Pressable style={style} onPress={action}>
            <StyledText style={textStyle} text={text} />
        </Pressable>
    )
}