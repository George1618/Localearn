import React from 'react';
import { View, ActivityIndicator } from "react-native";
import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons.lessonDialog;

export default function LessonDialog() {
    return (
        <View style={styles.lesson_container}>
            {/* Inserir animação de carregamento */}
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
            <StyledText text={s.textLoading} style={styles.lesson_loading}/>
        </View>
    );
}
