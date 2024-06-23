import { useEffect, useState } from "react";
import { View } from "react-native";

import LessonCard from "../../../components/LessonCard";
import { getExercicio } from '../../../services/api';

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons;

export default function Lessons() {
    const [lesson, setLesson] = useState(null);
    const [date, setDate] = useState(new Date());
    const [lessonCount, setLessonCount] = useState(0);

    async function fetchLesson() {
        try {
            const response = await getExercicio();
            setLesson({
                id: response.id,
                number: lessonCount + 1,
                question: response.pergunta
            });
            setDate(new Date());
        } catch (error) {
            console.error("Failed to fetch lesson:", error);
        }
    }    

    useEffect(() => {
        // atualiza a data
        setDate(new Date());
        // pega a próxima pergunta
        fetchLesson();
    }, [lessonCount]);

    function submitAnswer(answer) {
        // TODO: enviar a resposta ao backend
        setLessonCount(lessonCount + 1);
    }

    return (
        <View>
            <View style={styles.lesson_header}>
                <StyledText text={s.headerLessons + ` ${lesson.number}`} style={styles.lesson_title} />
                <StyledText text={date.toLocaleDateString()} style={styles.lesson_title} />
            </View>
            {lesson===null ? 
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                : 
                <LessonCard lesson={lesson} onDone={submitAnswer} />}
        </View>
    );
}