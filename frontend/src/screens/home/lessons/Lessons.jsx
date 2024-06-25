import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import LessonCard from "../../../components/LessonCard";
import { getExercicio, sendAnswersResult } from '../../../services/api';

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
                answer: response.resposta
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
        if (userAnswer === lesson.answer) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setWrongAnswers(wrongAnswers + 1);
        }

        try {
            const token = await firebase.auth().currentUser.getIdToken();
            await sendAnswersResult(token, correctAnswers, wrongAnswers);
        } catch (error) {
            console.error("Failed to send answers result:", error);
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
