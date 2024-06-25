import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDesempenho } from "../../../services/api";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";
import StatisticsItem from "../../../components/StatisticsItem";

const s = strings.home.statistics;

export default function Statistics({ navigation }) {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDesempenho = async () => {
            try {
                const token = await firebase.auth().currentUser.getIdToken();
                const desempenho = await getDesempenho(token);
                const formattedStats = [
                    { title: "Verbos Frasais", percentage: desempenho.Verbos_Frasais },
                    { title: "Preposições Comuns de Tempo", percentage: desempenho.Preposições_comuns_de_Tempo },
                    { title: "Preposições Comuns de Lugar", percentage: desempenho.Preposições_comuns_de_Lugar },
                    { title: "Advérbios de Frequência", percentage: desempenho.Advérbios_de_Frequência },
                    { title: "Intensificadores e Quantificadores", percentage: desempenho.Intensificadores_e_Quantificadores },
                    { title: "Perguntas Específicas", percentage: desempenho.Perguntas_Específicas },
                    { title: "Total", percentage: desempenho.Total }
                ];
                setStats(formattedStats);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDesempenho();
    }, []);

    return (
        <View style={styles.main_container}>
            <StyledText text={s.headerStatistics} style={styles.main_header} />
            {error && <Text style={styles.error}>{error}</Text>}
            {stats.map((item, key) => 
                <StatisticsItem 
                    key={key}
                    item={item} 
                />
            )}
        </View>
    );
}
