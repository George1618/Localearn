const Location = require('../services/Location.js');
const GooglePlaces = require('../services/GooglePlaces.js');
const fs = require('fs').promises;
const path = require('path');

const location = new Location();
const googlePlaces = new GooglePlaces();

async function getExercicio(req, res) {
    try {
        const coordenadas = await location.getCurrentLocation();
        const local = await googlePlaces.initMap(coordenadas[0], coordenadas[1]);
        if (local == undefined) {
            //local = Aluno.local[0];
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
                mensagem: "Nenhuma pergunta encontrada para esta localização"
            });
        }
    } catch (e) {
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

module.exports = {
    getExercicio,
};