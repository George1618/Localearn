import { StyleSheet, Text, View } from "react-native";

import LocationCard from "../../../components/LocationCard";

import strings from "../../../assets/strings";
import { useState } from "react";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.locations;

export default function Locations({ navigation }) {

    const [locations, _] = useState([]); // obter pelo backend

    return (
        <View>
            <StyledText text={s.headerLocations} style={styles.main_header} />
            {locations.length ? 
                locations.map(location => <LocationCard location={location} />)
                : 
                <StyledText style={styles.location_empty} text={s.textEmpty} />}
        </View>
    );
}