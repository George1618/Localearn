import { View } from "react-native";
import StyledText from "./StyledText";

export default function StatisticsItem({ name, percentage }) {
    return (<View>
        <StyledText text={name} style={{}} />
        <View style={{}} >
            <StyledText text={percentage} />
        </View>
        <View style={{}} />
    </View>)
}