import { View } from "react-native";

import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import styles from "../../../assets/styles";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";

const s = strings.home.main;
const { routes } = strings;

export default function Main({ navigation }) {
    const { user } = useContext(AuthContext);

    function navTo(route) {
        // o push adiciona à pilha de ir/voltar na navegação
        navigation.push(route);
    }

    return (
        <View style={styles.main}>
            <ActionButton 
                text={s.buttonLessons} 
                action={() => navTo(user.isTeacher? routes.lessonsTeacher : routes.lessons)} 
                style={styles.main_item}
                textStyle={styles.main_item_text} />
            <ActionButton 
                text={s.buttonStatistics} 
                action={() => navTo(user.isTeacher? routes.statisticsTeacher : routes.statistics)}
                style={styles.main_item}
                textStyle={styles.main_item_text} />
            {(user.isTeacher===false) && <ActionButton 
                text={s.buttonLocations} 
                action={() => navTo(routes.locations)}
                style={styles.main_item}
                textStyle={styles.main_item_text} />}
        </View>
    );
}