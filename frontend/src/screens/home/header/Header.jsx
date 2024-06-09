import { Image, Pressable, View } from "react-native";
import StyledText from "../../../components/StyledText";
import strings from "../../../assets/strings";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/auth";

/**
 * 
 * @param {{titleNav: () => void, menu: {title: string, action: () => void}[]}} param0 
 * @returns 
 */
export default function Header({titleNav, menu}) {
    const {user, setUser} = useContext(AuthContext)

    // estilização do menu
    const [open, setOpen] = useState(false);

    return (
        <View>
            <Pressable onPress={titleNav}>
                <StyledText text={strings.appName} />
            </Pressable>
            <View>
                <Pressable onPress={() => setOpen(!open)}>
                    <Image source={user.isTeacher ? '' : ''} />
                    <StyledText text={user.name} />
                </Pressable>
                {open ? menu.map(({title, action}, i) => <Pressable key={i} onPress={action}>
                    <StyledText text={title} />
                </Pressable>) : <></>}
            </View>
        </View>
    );
}