import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";
import StatisticsItem from "../../../components/StatisticsItem";
import { Picker } from "@react-native-picker/picker";
import AuthContext from "../../../contexts/AuthContext";

const s = strings.home.statistics;

export default function StatisticsTeacher({ navigation }) {
    const {user} = useContext(AuthContext)

    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [studentIndex, setStudentIndex] = useState(0);

    useEffect(() => {
        // TODO: puxar os alunos associados ao professor e salvar em students
    }, [user]);

    useEffect(() => {
        let student = students[studentIndex];
        // TODO: atualizar stats ao buscar da api o Desempenho do aluno selecionado
    }, [studentIndex]);

    return (
        <View style={styles.main_container}>
            <View>
                <StyledText text={s.headerStatistics} style={styles.main_header} />
                <Picker
                    selectedValue={studentIndex} 
                    onValueChange={value => setStudentIndex(value)} 
                    style={styles.signup_picker}
                >
                    {students.map((student, index) => (
                        <Picker.Item label={student.nome} style={styles.signup_picker_item} value={index} />
                    ))}
                </Picker>
            </View>
            {stats && stats.map((item, key) => 
                <StatisticsItem 
                    key={key}
                    item={item} 
                    />)}
        </View>
    );
}