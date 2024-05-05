import { StyleSheet, View } from "react-native";

import ActionButton from "../../../components/ActionButton";

import strings from "../../../assets/strings";

const s = strings.home.main;
const { routes } = strings;

export default function Main({ navigation }) {
    function navTo(route) {
        // o push adiciona à pilha de ir/voltar na navegação
        navigation.push(route);
    }

    return (
        <View style={styles.home}>
            <ActionButton text={s.buttonLessons} action={() => navTo(routes.lessons)} />
            <ActionButton text={s.buttonStatistics} action={() => navTo(routes.statistics)} />
            <ActionButton text={s.buttonLocations} action={() => navTo(routes.locations)} />
        </View>
    );
}

const styles =StyleSheet.create({
    home: {
        backgroundColor: "#2277FF"
    }
})