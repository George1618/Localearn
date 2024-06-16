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
        <StyledText text={lesson.question} style={styles.lesson_question} />
        <View style={styles.lesson_input_container}>
            <TextInput style={styles.lesson_input} defaultValue={answer} onChangeText={(text) => setAnswer(text)} />
        </View> 
        <ActionButton 
            text={s.buttonSubmit} 
            action={() => {onDone(answer); setAnswer("")}} 
            style={{...styles.submit_button, ...styles.lesson_submit}}
            textStyle={{...styles.submit_button_text, ...styles.lesson_submit_text}} />
    </View>)
}