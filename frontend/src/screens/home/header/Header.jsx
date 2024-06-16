import { Image, Pressable, StyleSheet, View } from "react-native";
import StyledText from "../../../components/StyledText";
import strings from "../../../assets/strings";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/auth";
import styles from "../../../assets/styles";

const image_student = require('../../../assets/empty_profile_student.png');
const image_teacher = require('../../../assets/empty_profile_teacher.png');

export default function Header({titleNav, menu}) {

    const {user, _} = useContext(AuthContext);

    // estilização do menu
    const [open, setOpen] = useState(false);

    return (<>
        <View style={styles.header}>
            <Pressable style={styles.title_nav} onPress={titleNav}>
                <StyledText text={strings.appName} style={styles.title_text} />
            </Pressable>
            <View style={styles.profile_nav}>
                <Pressable onPress={() => setOpen(!open)}  style={styles.profile_image_container}>
                    <Image style={styles.profile_image} source={user.isTeacher ? image_teacher : image_student}  />
                    <StyledText text={user.name} style={styles.profile_user_text} />
                </Pressable>
            </View>
        </View>
        <View style={styles.header_menu}>
            {open ? menu.map(({title, action}, i) => 
                <Pressable key={i} onPress={() => {action(); setOpen(false)}} style={styles.header_menu_item}>
                    <StyledText text={title} style={styles.header_menu_item_text} />
                </Pressable>) 
                : <></>
            }
        </View>
    </>);
}