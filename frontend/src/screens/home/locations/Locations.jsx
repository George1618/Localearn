import { StyleSheet, Text, View } from "react-native";

import LocationCard from "../../../components/LocationCard";

import strings from "../../../assets/strings";
import { useState } from "react";

const s = strings.home.locations;

export default function Locations({ navigation }) {

    const [locations, setLocations] = useState([]); // obter do usuário pelo backend

    return (
        <View>
            <Text style={styles.text}>{s.headerLocations}</Text>
            {locations.length ? 
                locations.map(loc => <LocationCard location={loc} />)
                : 
                <Text style={styles.text}>{s.textEmpty}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#000'
    }
})