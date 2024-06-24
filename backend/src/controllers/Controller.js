const Location = require('../services/Location.js');
const GooglePlaces = require('../services/GooglePlaces.js');
const fs = require('fs').promises;
const path = require('path');
const db = require('../firebaseAdmin');

const location = new Location();
const googlePlaces = new GooglePlaces();

const pegarLocalizacaoAntigaMock = "gym";

async function getExercicio(req, res) {
    try {
        const coordenadas = await location.getCurrentLocation();
        const local = await googlePlaces.initMap(coordenadas[0], coordenadas[1]);
        if (local == undefined) {
            //local = Aluno.local[0];
            //A ideia aqui é conseguir puxar o histórico de localização do aluno
            local = pegarLocalizacaoAntigaMock;
        }
        const perguntas = await carregarPerguntas();
        const perguntasFiltradas = perguntas.filter(pergunta => pergunta.local === local);
        if (perguntasFiltradas.length > 0) {
            const perguntaSelecionada = selecionarPerguntaAleatoria(perguntasFiltradas);
            res.status(200).send({
                pergunta: perguntaSelecionada.pergunta,
                resposta: perguntaSelecionada.resposta
            });
        } else {
            res.status(404).send({
                codigo: 404,
                mensagem: "Nenhuma pergunta encontrada para esta localização!"
            });
        }
    } catch (e) {
        res.status(422).send({
            codigo: 500,
            mensagem: "Erro no servidor interno."
        });
    }
}

async function updateLocalizacao(req, res) {
    try {
        const coordenadas = await location.getCurrentLocation();
        const local = await googlePlaces.initMap(coordenadas[0], coordenadas[1]);
        if (local != undefined) {
            // Aluno.local = local;
            // Aluno.save();
            // A ideia aqui é conseguir salvar a localização atual 
            res.status(200).send({
                mensagem: "Localização armazenada com sucesso!"
            });
        }
        else {
            res.status(200).send({
                mensagem: "Localização indefinida."
            });
        }
    } catch (error) {
        res.status(422).send({
            codigo: 500,
            mensagem: "Erro no servidor interno"
        });
    }
}

async function carregarPerguntas() {
    try {
        const filePath = path.join(__dirname, '..', 'perguntas', 'Perguntas.json');
        const data = await fs.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        throw error;
    }
}

function selecionarPerguntaAleatoria(perguntas) {
    const indiceAleatorio = Math.floor(Math.random() * perguntas.length);
    return perguntas[indiceAleatorio];
}

async function getLocais(req, res) {
    try {
        const alunosSnapshot = await db.collection('alunos').get();
        const locais = [];
        alunosSnapshot.forEach(doc => {
            const alunoData = doc.data();
            if (alunoData.local) {
                locais.push(...alunoData.local);
            }
        });
        res.status(200).send(locais);
    } catch (error) {
        res.status(500).send({
            mensagem: "Erro ao buscar locais",
            error: error.message
        });
    }
}

module.exports = {
    getExercicio,
    updateLocalizacao,
    getLocais
};