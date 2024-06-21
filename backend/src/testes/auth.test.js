const request = require("supertest");
const app = require("../server.js");

describe("Teste da rota POST - /signup", () => {
    describe("Casos válidos", () => {
        it("CT001 - Field Test - Todos os valores válidos e criação do aluno", async () => {
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
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toEqual("Usuário criado com sucesso!");
        });
    });
    describe("Casos inválidos", () => {
        it("CT002 - Email repetido", async () => {
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
        it("CT003 - Field Test - Todos os valores válidos e login do usuário", async () => {
            const email = "testeemail1@gmail.com";
            const password = "teste123";

            const response = await request(app)
             .post("/auth/login")
             .send({
                email: email,
                password: password,
             });
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
            expect(response.body).toHaveProperty("userData");
        });
    });
    describe("Casos inválidos", () => {
        //it("CT004 - ", async () => {
            // To do
        //});
    });
});

describe("Teste da rota DELETE - /aluno", () => {
    describe("Casos válidos", () => {

    })
})