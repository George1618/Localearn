import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LessonCard from "../../../components/LessonCard";
import LessonDialog from "./LessonDialog";
import { getExercicio } from '../../../services/api';

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons;

export default function Lessons() {
    const [lesson, setLesson] = useState({});
    const [date, setDate] = useState(new Date());
    const [lessonCount, setLessonCount] = useState(0);

    useEffect(() => {
        const fetchLesson = async () => {
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
        };

        fetchLesson();
    }, [lessonCount]);

    function submitAnswer(answer) {
        // envia a resposta ao backend
        setLessonCount(lessonCount + 1);
    }

    return (
        <View>
            <View style={styles.lesson_header}>
                <StyledText text={s.headerLessons + ` ${lesson.number}`} style={styles.lesson_title} />
                <StyledText text={date.toLocaleDateString()} style={styles.lesson_title} />
            </View>
            {lesson.id === undefined ? 
                <LessonDialog /> 
                : 
                <LessonCard lesson={lesson} onDone={submitAnswer} />}
        </View>
    );
}