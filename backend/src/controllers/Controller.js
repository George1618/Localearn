const fs = require('fs').promises;
const path = require('path');

class Controller{
    constructor(L, GL){
        this.location = L;
        this.googlePlaces = GL;
    }

    async init() {
        const localizacao = await this.pegarLocalizacao();
        console.log(localizacao);
        const pergunta = await this.pegaPergunta(localizacao);
    }

    async pegarLocalizacao() {
        try {
            const coordenadas = await this.location.getCurrentLocation();
            console.log(coordenadas);
            const resultado = await this.googlePlaces.initMap(coordenadas[0], coordenadas[1]);
            return resultado;
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async pegaPergunta(localizacao) {
        try {
            const perguntas = await this.carregarPerguntas();
            const perguntasFiltradas = perguntas.filter(pergunta => pergunta.local === localizacao);
            if (perguntasFiltradas.length > 0) {
                const perguntaSelecionada = this.selecionarPerguntaAleatoria(perguntasFiltradas);
                console.log('Pergunta:', perguntaSelecionada.pergunta);
                console.log('Resposta:', perguntaSelecionada.resposta);
            } else {
                console.log('Nenhuma pergunta encontrada para esta localização.');
            }
        } catch (error) {
            throw error;
        }
    }

    async carregarPerguntas() {
        try {
            const filePath = path.join(__dirname, '..', 'perguntas', 'Perguntas.json');
            const data = await fs.readFile(filePath);
            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }

    selecionarPerguntaAleatoria(perguntas) {
        const indiceAleatorio = Math.floor(Math.random() * perguntas.length);
        return perguntas[indiceAleatorio];
    }
}

module.exports = Controller;