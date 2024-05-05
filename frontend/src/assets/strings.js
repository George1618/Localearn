const strings = {
    appName: "Localearn",
    routes: {
        login: "Login",
        signup: "Signup",
        home: "Home",
        profile: "Profile",
        main: "Main",
        lessons: "Lessons",
        statistics: "Statistics",
        locations: "Locations",
    },
    // screens
    home: {
        profile: {
            headerProfile: "Seu Perfil",
            labelUsername: "Nome de usuário",
            labelPassword: "Senha",
            buttonEdit: "Editar",
            buttonConfirm: "Salvar alterações",
            profileDialog: {
                buttonView: "Minha conta",
                buttonLogout: "Sair"
            }
        },
        main: {
            buttonLessons: "Exercícios",
            buttonStatistics: "Desempenho",
            buttonLocations: "Histórico de Localização"
        },
        lessons: {
            headerLessons: "Exercício",
            lessonDialog: {
                textLoading: "Carregando exercícios..."
            }
        },
        statistics: {
            headerStatistics: "Seu Desempenho"
        },
        locations: {
            headerLocations: "Seus Locais",
            textEmpty: "Não há locais visitados."
        }
    },
    login: {
        labelUser: "Usuário",
        labelPassword: "Senha",
        textSignupLine: "Não tem conta?",
        textSignup: "Cadastre-se",
        buttonLogin: "Login",
    },
    signup: {
        labelUsername: "Nome de usuário",
        labelPassword: "Senha",
        labelConfirmPassword: "Confirmar senha",
        pickerLabel: "Sou:",
        pickerStudent: "Aluno",
        pickerTeacher: "Professor",
        buttonSignup: "Cadastrar-se"
    }
}

export default strings;