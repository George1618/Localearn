import { Button, Image, Text, View } from "react-native";
import strings from "../../../assets/strings";

const s = strings.home.profile.profileDialog;

export default function ProfileDialog({ User, onViewProfile, onLogout }) {
    return (
        <View>
            <Image source={User.isTeacher ? '' : ''} />
            <Text>{User.name}</Text>
            <Button onPress={onViewProfile}>{s.buttonView}</Button>
            <Button onPress={onLogout}>{s.buttonLogout}</Button>
        </View>
    );
}