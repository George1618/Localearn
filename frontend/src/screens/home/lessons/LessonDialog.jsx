import { View } from "react-native";

import strings from "../../../assets/strings";

const s = strings.home.lessons.lessonDialog;

export default function lessonDialog() {
    return (
        <View>
            { /* Inserir animação de carregamento */  }
            <Text>{s.textLoading}</Text>
        </View>
    );
}