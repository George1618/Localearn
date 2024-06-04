import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import strings from "../../../assets/strings";

const s = strings.home.statistics;

export default function Statistics({ navigation }) {
    const [stats, setStats] = useState({});

    return (
        <View>
            <Text style={styles.text}>{s.headerStatistics}</Text>
            {/* Criar componentes e estrutura de desempenho */}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000'
    }
})