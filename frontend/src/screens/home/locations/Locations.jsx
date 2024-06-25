import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LocationCard from "../../../components/LocationCard";
import { getRecentLocations } from '../../../services/api';
import firebase from '../../../services/firebaseConfig';

import strings from "../../../assets/strings";
import StyledText from "../../../components/StyledText";
import styles from "../../../assets/styles";

const s = strings.home.locations;

export default function Locations({ navigation }) {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocais = async () => {
            try {
                const user = firebase.auth().currentUser;
                if (user) {
                    const token = await user.getIdToken();
                    const locais = await getRecentLocations(token);
                    setLocations(locais);
                }
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };

        fetchLocais();
    }, []);

    return (
        <View style={styles.main_container}>
            <StyledText text={s.headerLocations} style={styles.main_header} />
            {locations.length ? 
                locations.map((location, index) => <LocationCard key={index} location={location} />)
                : 
                <StyledText style={styles.location_empty} text={s.textEmpty} />}
        </View>
    );
}