import { TextInput, View } from "react-native";
import StyledText from "./StyledText";
import ActionButton from "./ActionButton";
import strings from "../assets/strings";
import styles from "../assets/styles";
import { useState } from "react";

const s = strings.home.lessons;

export default function LessonCard({ lesson, onDone }) {
    const [answer, setAnswer] = useState("")

    return (<View style={styles.lesson}>
        <StyledText text={lesson.question} style={{}} />
        <TextInput style={{}} defaultValue={answer} onChangeText={(text) => setAnswer(text)} />
        <ActionButton text={s.buttonSubmit} action={() => {onDone(answer); setAnswer("")}} style={styles.lesson_submit} />
    </View>)
}