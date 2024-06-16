import { View } from "react-native";

import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";
import styles from "../../../assets/styles";

const s = strings.home.main;
const { routes } = strings;

export default function Main({ navigation }) {
    function navTo(route) {
        // o push adiciona à pilha de ir/voltar na navegação
        navigation.push(route);
    }

    return (
        <View style={styles.main}>
            <ActionButton 
                text={s.buttonLessons} 
                action={() => navTo(routes.lessons)} 
                style={styles.main_item}
                textStyle={styles.main_item_text} />
            <ActionButton 
                text={s.buttonStatistics} 
                action={() => navTo(routes.statistics)}
                style={styles.main_item}
                textStyle={styles.main_item_text} />
            <ActionButton 
                text={s.buttonLocations} 
                action={() => navTo(routes.locations)}
                style={styles.main_item}
                textStyle={styles.main_item_text} />
        </View>
    );
}