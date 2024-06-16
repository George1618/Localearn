import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";
import StatisticsItem from "../../../components/StatisticsItem";

const s = strings.home.statistics;

export default function Statistics({ navigation }) {
    // puxar estatísticas reais do backend
    const [stats, setStats] = useState({"gramática": 0.50, "vocabulário": 0.95});

    return (
        <View>
            <StyledText text={s.headerStatistics} style={styles.main_header} />
            {Object.keys(stats).map(key => 
                <StatisticsItem 
                    key={key}
                    name={key} 
                    percentage={stats[key]} 
                    />)}
        </View>
    );
}