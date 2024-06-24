const Location = require('../services/Location.js');
const GooglePlaces = require('../services/GooglePlaces.js');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const location = new Location();
const googlePlaces = new GooglePlaces();

const pegarLocalizacaoAntigaMock = "gym";

async function getExercicio(req, res) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
        const coordenadas = await location.getCurrentLocation();
        let local = await googlePlaces.initMap(coordenadas[0], coordenadas[1]);
        let nivel = 1;
        if (local === false) {
            req.status(500).send({
                codigo: 500,
                mensagem: "Erro na obtenção da localização"
            })
        }
        if (local == undefined) {
            const reqLocal = await axios.get("http://localhost:3000/user/userData", {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            local = reqLocal.data.userData.local;
            nivel = reqLocal.data.userData.nível;
            console.log(local);
            console.log(nivel);
        }
        const perguntas = await carregarPerguntas();
        let perguntasFiltradas = perguntas.filter(pergunta => pergunta.local === local);
        if (perguntasFiltradas.length <= 0) {
            res.status(404).send({
                codigo: 404,
                mensagem: "Nenhuma pergunta encontrada para esta localização!"
            });
        }
        perguntasFiltradas = perguntasFiltradas.filter(pergunta => pergunta.nivel === nivel);
        if (perguntasFiltradas.length > 0) {
            const perguntaSelecionada = selecionarPerguntaAleatoria(perguntasFiltradas);
            res.status(200).send({
                pergunta: perguntaSelecionada.pergunta,
                resposta: perguntaSelecionada.resposta
            });
        } else {
            res.status(404).send({
                codigo: 404,
                mensagem: "Nenhuma pergunta encontrada para esta localização com esse nível!"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(422).send({
            codigo: 500,
            mensagem: "Erro no servidor interno."
        });
    }
}

async function updateLocalizacao(req, res) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
        const coordenadas1 = await location.getCurrentLocation();
        const local1 = await googlePlaces.initMap(coordenadas1[0], coordenadas1[1]);
        if (local1 != undefined) {
            await new Promise(resolve => setTimeout(resolve, 20000));
            const coordenadas2 = await location.getCurrentLocation();
            const local2 = await googlePlaces.initMap(coordenadas2[0], coordenadas2[1]);
            if (local1 == local2) {
                const updateLocal = await axios.put("http://localhost:3000/user/updateLocal", {
                    local: local
                }, {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                });
                if (updateLocal.status == 200) {
                    res.status(200).send({
                        mensagem: "Localização armazenada com sucesso!"
                    });
                }
                else {
                    res.status(updateLocal.status).send({
                        mensagem: updateLocal.message
                    });
                }
            }
        } else {
            res.status(200).send({
                mensagem: "Localização indefinida."
            });
        }
    } catch (error) {
        console.log(error);
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
    updateLocalizacao
};