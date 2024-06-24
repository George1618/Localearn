const request = require("supertest");
const app = require("../server.js");

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyClboIbYYOloGtyxQGiBuk35jQw_SKJnFc",
    authDomain: "localearn-687d1.firebaseapp.com",
    projectId: "localearn-687d1",
    storageBucket: "localearn-687d1.appspot.com",
    messagingSenderId: "658807721967",
    appId: "1:658807721967:android:c6d7e3cf28d27504edf01a"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

/*describe("Teste da rota POST - /signup", () => {
    describe("Casos válidos", () => {
        it("CT001 - Field Test - Todos os valores válidos e criação do aluno", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste123";
            const username = "Teste Fulano";
            const isTeacher = false;

            const response = await request(app)
             .post("/auth/signup")
             .send({
                email: email,
                password: password,
                username: username,
                isTeacher: isTeacher
             });
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toEqual("Usuário criado com sucesso!");
        });
        it("CT002 - Field Test - Todos os valores válidos e criação do professor", async () => {
            const email = "testeemail7@gmail.com";
            const password = "teste123";
            const username = "Teste Fulano";
            const isTeacher = true;

            const response = await request(app)
             .post("/auth/signup")
             .send({
                email: email,
                password: password,
                username: username,
                isTeacher: isTeacher
             });
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toEqual("Usuário criado com sucesso!");
        });
    });
    describe("Casos inválidos", () => {
        it("CT003 - Email repetido", async () => {
            const email = "testeemail1@gmail.com";
            const password = "teste123";
            const username = "Teste Fulano";
            const isTeacher = false;

            const response = await request(app)
             .post("/auth/signup")
             .send({
                email: email,
                password: password,
                username: username,
                isTeacher: isTeacher
             });
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error");
        })
    })
});

describe("Teste da rota POST - /login", () => {
    describe("Casos válidos", () => {
        it("CT004 - Field Test - Todos os valores válidos e login do usuário", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste123";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .post("/auth/login")
             .set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
            expect(response.body).toHaveProperty("userData");
            console.log(response.body.userData);
        });
    });
    describe("Casos inválidos", () => {
        it("CT005 - Field Test - Senha inválida", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste1234";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .post("/auth/login")
             .set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("error");
            console.log(response.body.error);
        });
    });
});*/

describe("Teste da rota DELETE - /aluno", () => {
    describe("Casos válidos", () => {

    })
})

/*describe("Teste da rota GET - /userData", () => {
    describe("Casos válidos", () => {
        it("CT006 - Field Test - Usuário válido", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste123";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .get("/user/userData")
             .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("userData");
            expect(response.body).toHaveProperty("role");
            expect(response.body.role).toEqual("student");
            console.log(response.body.userData.local);
        }) 
    })
})

describe("Teste da rota PUT - /userData", () => {
    describe("Casos válidos", () => {
        it("CT006 - Field Test - Usuário válido", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste123";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .put("/user/userData")
             .set("Authorization", `Bearer ${token}`)
             .send({
                email: "testeemail100@gmail.com",
                nome: "Finalmente"
             });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toEqual("User data updated successfully");
        }) 
    })
})*/

describe("Teste da rota POST - /localizacao", () => {
    describe("Casos válidos", () => {
        it("CT006 - Field Test - Usuário válido", async () => {
            const email = "testeemail5@gmail.com";
            const password = "teste123";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .post("/localearn/localizacao")
             .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("mensagem");
            expect(response.body.mensagem).toEqual("Localização armazenada com sucesso!");
        }) 
    })
})

describe("Teste da rota GET - /getExercicio", () => {
    describe("Casos válidos", () => {
        it("CT006 - Field Test - Usuário válido", async () => {
            const email = "testeemail6@gmail.com";
            const password = "teste123";
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const response = await request(app)
             .get("/localearn/exercicio")
             .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("pergunta");
            expect(response.body).toHaveProperty("resposta");
            console.log(response.body.pergunta);
            console.log(response.body.resposta);
        }) 
    })
})

