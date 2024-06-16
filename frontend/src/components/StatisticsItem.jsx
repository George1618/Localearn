import { View } from "react-native";
import StyledText from "./StyledText";
import styles from "../assets/styles";

export default function StatisticsItem({ item }) {
    function convertPercentage(perc=0) {
        if (perc-Math.floor(perc)!==0) {
            return perc.toFixed(2);
        } else {return perc.toString()}
    }

    return (<View style={styles.statistics_item}>
        <StyledText text={item.title} style={styles.statistics_item_title} />
        <View style={{...styles.statistics_item_percentage_container, width: `${item.percentage}%`}}>
            <StyledText text={`${convertPercentage(item.percentage)}%`} 
                style={styles.statistics_item_percentage_text} />
        </View>
    </View>)
}