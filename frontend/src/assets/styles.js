import { StyleSheet } from "react-native";

const colors = {
    black: "#000",
    white: "#fff",
    red: "#f77",
    blue: "#02a",
    darkblue: "#017",
};

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    app_content: {
        flex: 1,
        backgroundColor: colors.blue
    },

    home: {
        flex: 1,
        display: 'flex',
    },
    header: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.darkblue
    },
    title_nav: {
        width: '45%',
        marginLeft: '5%'
    },
    title_text: {
        height: '100%',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 24
    },
    profile_nav: {
        width: '45%',
        marginRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'visible'
    },
    profile_image_container: {
        height: 80,
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profile_image: {
        height: 60,
        width: 60,
        backgroundColor: colors.blue,
        overflow: 'hidden',
        borderRadius: 50
    },
    profile_user_text: {
        color: colors.white,
        fontSize: 18,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    header_menu: {
        height: 80,
        width: '50%',
        alignSelf: 'flex-end',
        backgroundColor: colors.blue
    },
    header_menu_item: {
        height: 40,
        width: "80%",
        alignSelf: 'flex-end',
        backgroundColor: colors.darkblue,
        overflow: 'hidden',
        borderRadius: 5
    },
    header_menu_item_text: {
        fontSize: 16,
        marginEnd: "10%",
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white,
    },

    main_container: {
        height: '100%',
        backgroundColor: colors.blue
    },
    main: {
        marginTop: 40,
        height: '40%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:  'space-around',
        alignItems: 'center'
    },
    main_item: {
        width: '90%',
        height: '25%',
        backgroundColor: colors.darkblue,
        overflow: 'hidden',
        borderRadius: 15
    },
    main_item_text: {
        color: colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        fontSize: 24
    },

    main_header: {
        height: '15%',
        marginHorizontal: '5%',
        marginBottom: '5%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 22
    },
    main_profile_button_container: {
        width: '100%',
        marginTop: '10%',
        display: 'flex',
        flexDirection:'row'
    }, 
    main_profile_button: {
        marginHorizontal: '2.5%',
        width: '45%'
    },
    main_profile_button_non_edit: {
        marginHorizontal: '2.5%',
        width: '95%'
    },
    main_profile_button_text: {
        fontSize: 16
    },

    location_empty: {
        height: '20%',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: colors.white
    },

    statistics_item: {
        backgroundColor: colors.darkblue,
        marginBottom: '1%',
        height: '12%',
        width: '90%',
        alignSelf: 'center',
        padding: '2%'
    },
    statistics_item_title: {
        color: colors.white,
        fontSize: 18
    },
    statistics_item_percentage_container: {
        height: '50%',
        backgroundColor: colors.white
    },
    statistics_item_percentage_text: {
        height: '100%',
        textAlignVertical: 'center',
        color: colors.blue
    },

    lesson_header: {
        height: '15%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    lesson_title: {
        color: colors.white,
        textAlignVertical: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    lesson_container: {
        height: '85%', 
        width: '100%'
    },
    lesson_loading: {
        color: colors.white,
        height: '100%',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    lesson: {
        alignSelf: 'center', 
        height: '80%', 
        width: '95%', 
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    lesson_question: {
        color: colors.blue,
        alignSelf: 'center',
        fontSize: 20
    },
    lesson_input_container: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderColor: colors.blue
    },
    lesson_input: {
        overflow: 'hidden',
        color: colors.blue
    },
    lesson_submit: {
        backgroundColor: colors.blue
    },
    lesson_submit_text: {
        color: colors.white
    },

    non_home_header: {
        margin: 52,
        textAlign: 'center',
        color: colors.white,
        fontSize: 32
    },
    login_signup: {
        marginVertical: "10%",
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    login_signup_text: {
        color: colors.white
    },
    login_signup_link: {
        textDecorationLine: "underline",
        color: colors.red
    },

    signup_picker_container: {
        marginLeft: "5%",
        marginVertical: "10%",
        display: 'flex',
        flexDirection: 'row'
    },
    signup_picker_text: {
        color: colors.white,
        textAlignVertical: 'center',
        fontSize: 18,
        width: "10%"
    },
    signup_picker: {
        marginLeft: "10%",
        width: "75%",
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: colors.darkblue
    },
    signup_picker_item: {
        color: colors.white
    },

    
    labeled_name_text: {
        marginLeft: "5%",
        marginTop: "5%",
        fontSize: 18,
        color: colors.white
    },
    labeled_name_input: {
        width: "95%",
        alignSelf: 'center',
        backgroundColor: colors.white,
        color: colors.blue,
        borderColor: colors.light_shadow,
        overflow: 'hidden',
        borderRadius: 10
    },
    labeled_password_text_container: {
        marginLeft: "5%",
        marginTop: "5%",
        display: 'flex',
        flexDirection: 'row'
    },
    labeled_password_text: {
        fontSize: 18,
        color: colors.white
    },
    labeled_password_input: {
        width: "95%",
        alignSelf: 'center',
        backgroundColor: colors.white,
        color: colors.blue,
        overflow: 'hidden',
        borderRadius: 10
    },
    labeled_password_text_invalid: {
        marginHorizontal: "10%",
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        color: colors.red
    },
    labeled_password_input_invalid: {
        width: "95%",
        alignSelf: 'center',
        backgroundColor: colors.white,
        color: colors.blue,
        overflow: 'hidden',
        borderRadius: 10
    },

    submit_button: {
        backgroundColor: colors.white,
        alignSelf: 'center',
        height: 50,
        paddingHorizontal: 50,
        overflow: 'hidden',
        borderRadius: 10
    },
    submit_button_text: {
        height: "100%",
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 22,
        textTransform: 'capitalize',
        color: colors.blue,
    },
});

export default styles;