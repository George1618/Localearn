const strings = {
    appName: "Localearn",
    routes: {
        login: "Login",
        signup: "Signup",
        home: "Home",
        profile: "Profile",
        main: "Main",
        lessons: "Lessons",
        lessonsTeacher: "LessonsTeacher",
        statistics: "Statistics",
        statisticsTeacher: "StatisticsTeacher",
        locations: "Locations",
    },
    // screens
    home: {
        header: {
            optionProfile: "Perfil",
            optionLogOut: "Sair"
        },
        profile: {
            headerProfile: "Seu Perfil",
            labelUsername: "Nome de usuário",
            labelEmail: "Email",
            buttonEdit: "Editar",
            buttonConfirm: "Salvar alterações",
            buttonCancel: "Cancelar"
        },
        main: {
            buttonLessons: "Exercícios",
            buttonStatistics: "Desempenho",
            buttonLocations: "Histórico de Localização"
        },
        lessons: {
            headerLessons: "Exercício",
            buttonSubmit: "Responder",
            labelQuestion: "Pergunta",
            labelAnswer: "Resposta",
            buttonEdit: "Editar",
            buttonSave: "Salvar",
            buttonCancel: "Cancelar",
            buttonDelete: "Apagar",
            buttonAdd: "Adicionar"
        },
        lessonsTeacher: {
            headerLessons: "Exercícios",
            lessonsEdit: "Editar",
            lessonsSave: "Salvar Alterações"
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
        labelUser: "Email",
        labelPassword: "Senha",
        textSignupLine: "Não tem conta?",
        textSignup: "Cadastre-se",
        buttonLogin: "Login",
    },
    signup: {
        labelUsername: "Nome de usuário",
        labelEmail: "Email",
        labelPassword: "Senha",
        labelConfirmPassword: "Confirmar senha",
        invalidPassword: "Senhas não estão iguais",
        pickerLabel: "Sou:",
        pickerStudent: "Aluno",
        pickerTeacher: "Professor",
        buttonSignup: "Cadastrar"
    }
}

export default strings;