import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LessonCard from "../../../components/LessonCard";
import LessonDialog from "./LessonDialog";

import strings from "../../../assets/strings";

const s = strings.home.lessons;

export default function Lessons() {
    const [lesson, setLesson] = useState({});
    const [date, setDate] = useState(new Date());
    const [lessonCount, setLessonCount] = useState(0);

    useEffect(() => {
        // atualizar lesson a partir do lessonCount e talvez outros parâmetros, como uma mudança repentina de localização
        // estabelecer uma trajetória de funções, talvez com um limite para lessonCount

        // atualiza a data
        const dateInterval = setInterval(() => setDate(new Date()), 1000);

        return function cleanup() {
            clearInterval(dateInterval);
        }
    }, [lessonCount])

    return (
        <View>
            <Text style={styles.text}>{s.headerLessons}</Text>
            <Text style={styles.text}>{date.toLocaleDateString()}</Text>
            {lesson.id ? 
                <LessonDialog /> 
                : 
                <LessonCard lesson={lesson} onDone={() => setLessonCount(lessonCount+1)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000'
    }
})