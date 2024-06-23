import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import LessonCard from "../../../components/LessonCard";
import { getLesson } from '../../../services/api';

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";
import LessonItem from "../../../components/LessonItem";
import ActionButton from "../../../components/ActionButton";

const s = strings.home.lessons;

export default function LessonsTeacher() {
    const [lessons, setLessons] = useState([]);

    const [newLesson, setNewLesson] = useState(false);
    const emptyLesson = {pergunta: "", resposta: ""};

    async function fetchLessons() {
        // TODO: pegar todas as lições que o user professor pode acessar
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    async function updateLesson(question, answer, index) {
        let lesson = lessons[index];
        // TODO: atualizar o que user mudar na lição 
    }

    async function insertLesson(question, answer) {
        // TODO: inserir uma nova lição nas lições do professor
    }

    async function deleteLesson(index) {
        let lesson = lessons[index];
        //TODO: apagar a lição acima
    }

    return (
        <View>
            <View style={styles.lesson_header}>
                <StyledText text={s.headerLessons + ` ${lesson.number}`} style={styles.lesson_title} />
                <StyledText text={date.toLocaleDateString()} style={styles.lesson_title} />
            </View>
            <ScrollView>
                {lessons.size === 0 ? 
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                    : 
                    lessons.map((lesson, index) => 
                        <LessonItem 
                            key={index}
                            lesson={lesson} 
                            onEdit={(question, answer) => updateLesson(question, answer, index)}
                            onDelete={() => onDelete(index)} />)}
            </ScrollView>
            {newLesson && <View>
                <LessonItem 
                    lesson={emptyLesson}
                    onEdit={insertLesson} />   
            </View>} 
            <ActionButton
                text={s.labelAdd}
                action={() => setNewLesson(true)} />
        </View>
    );
}