import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import LessonCard from "../../../components/LessonCard";
import { getExercicio, updateDesempenho } from '../../../services/api';

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons;

export default function Lessons() {
    const [lesson, setLesson] = useState(null);
    const [date, setDate] = useState(new Date());
    const [lessonCount, setLessonCount] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    async function fetchLesson() {
        try {
            const response = await getExercicio();
            setLesson({
                id: response.id,
                number: lessonCount + 1,
                question: response.pergunta,
                answer: response.resposta,
                category: response.categoria // Adicionando a categoria
            });
            setDate(new Date());
        } catch (error) {
            console.error("Failed to fetch lesson:", error);
        }
    }

    useEffect(() => {
        fetchLesson();
    }, [lessonCount]);

    async function submitAnswer(userAnswer) {
        const acerto = userAnswer === lesson.answer;
        
        if (acerto) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setWrongAnswers(wrongAnswers + 1);
        }

        try {
            const token = await firebase.auth().currentUser.getIdToken();
            await updateDesempenho(token, lesson.category, acerto); // Chamar updateDesempenho
        } catch (error) {
            console.error("Failed to update desempenho:", error);
        }

        setLessonCount(lessonCount + 1);
    }

    return (
        <View>
            <View style={styles.lesson_header}>
                <StyledText text={s.headerLessons + ` ${lesson ? lesson.number : ''}`} style={styles.lesson_title} />
                <StyledText text={date.toLocaleDateString()} style={styles.lesson_title} />
            </View>
            {lesson === null ? 
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                : 
                <LessonCard lesson={lesson} onDone={submitAnswer} />}
        </View>
    );
}