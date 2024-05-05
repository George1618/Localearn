import { Text, View } from "react-native";

import LocationCard from "../../../components/LocationCard";

import strings from "../../../assets/strings";
import { useState } from "react";

const s = strings.home.locations;

export default function Locations({ navigation }) {

    const [locations, setLocations] = useState([]); // obter do usuário pelo backend

    return (
        <View>
            <Text>{s.headerLocations}</Text>
            {locations.length ? 
                locations.map(loc => <LocationCard location={loc} />)
                : 
                <Text>{s.textEmpty}</Text>}
        </View>
    );
}