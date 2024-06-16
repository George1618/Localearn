import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";
import StatisticsItem from "../../../components/StatisticsItem";

const s = strings.home.statistics;

export default function Statistics({ navigation }) {
    // puxar estatísticas reais do backend
    const [stats, _] = useState([
        {title: "Gramática", percentage: 80}, 
        {title: "Ortografia", percentage: 50}, 
        {title: "Vocabulário", percentage: 99.5}
    ]);

    return (
        <View style={styles.main_container}>
            <StyledText text={s.headerStatistics} style={styles.main_header} />
            {stats.map((item, key) => 
                <StatisticsItem 
                    key={key}
                    item={item} 
                    />)}
        </View>
    );
}