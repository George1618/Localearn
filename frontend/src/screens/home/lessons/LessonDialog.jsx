import { View } from "react-native";

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.lessons.lessonDialog;

export default function lessonDialog() {
    return (
        <View style={styles.lesson_container}>
            { /* Inserir animação de carregamento */  }
            <StyledText text={s.textLoading}  style={styles.lesson_loading}/>
        </View>
    );
}