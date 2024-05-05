import { useState } from "react";
import { View } from "react-native";

import strings from "../../../assets/strings";

const s = strings.home.statistics;

export default function Statistics({ navigation }) {
    const [stats, setStats] = useState({});

    return (
        <View>
            <Text>{s.headerStatistics}</Text>
            {/* Criar componentes e estrutura de desempenho */}
        </View>
    );
}