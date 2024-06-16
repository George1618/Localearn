import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LessonCard from "../../../components/LessonCard";
import LessonDialog from "./LessonDialog";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons;

export default function Lessons() {
    const [lesson, setLesson] = useState({});
    const [date, setDate] = useState(new Date());
    const [lessonCount, setLessonCount] = useState(0);

    useEffect(() => {
        // atualizar lesson a partir do lessonCount e talvez outros parâmetros, como uma mudança repentina de localização
        // estabelecer uma trajetória de funções, talvez com um limite para lessonCount
        setLesson({id: 132, number: lessonCount+1, question: 'WDYS when you are done eating in a restaurant?'})
        // atualiza a data
        setDate(new Date());
    }, [lessonCount])

    // submete a resposta de um card e pede o próximo com o effect acima
    function submitAnswer(answer) {
        // enviar a resposta ao backend
        setLessonCount(lessonCount+1)
    }

    return (
        <View>
            <View style={styles.lesson_header}>
                <StyledText text={s.headerLessons+` ${lesson.number}`} style={styles.lesson_title} />
                <StyledText text={date.toLocaleDateString()} style={styles.lesson_title} />
            </View>
            {lesson.id===undefined ? 
                <LessonDialog /> 
                : 
                <LessonCard lesson={lesson} onDone={submitAnswer} />}
        </View>
    );
}