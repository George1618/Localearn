import { TextInput, View } from "react-native";
import StyledText from "./StyledText";
import ActionButton from "./ActionButton";
import strings from "../assets/strings";
import styles from "../assets/styles";
import { useState } from "react";

const s = strings.home.lessons;

export default function LessonItem({ lesson, onEdit, onDelete=null }) {
    const [question, setQuestion] = useState(lesson.pergunta);
    const [answer, setAnswer] = useState(lesson.resposta);
    const [isEditing, setIsEditing] = useState(false);

    return (<View>
        <View>
            <StyledText text={s.labelQuestion} />
            <TextInput defaultValue={lesson.pergunta} onChangeText={(text) => setQuestion(text)} />
        </View>
        <View>
            <StyledText text={s.labelAnswer} />
            <TextInput defaultValue={lesson.resposta} onChangeText={(text) => setAnswer(text)} />
        </View>
        <View>
            <ActionButton
                text={isEditing ? s.buttonSave : s.buttonEdit}
                action={() => {isEditing ? onEdit(question, answer) : setIsEditing(true)}} 
            />
            {isEditing && (
                <ActionButton
                    text={s.buttonCancel}
                    action={() => {setQuestion(lesson.pergunta); setAnswer(lesson.resposta)}} 
                />
            )}
            {onDelete && (
                <ActionButton
                    text={s.buttonDelete}
                    action={() => onDelete} 
                />
            )}
        </View>
    </View>)
}