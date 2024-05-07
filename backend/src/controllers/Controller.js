class Controller{
    constructor(L, GL){
        this.location = L;
        this.googlePlaces = GL;
    }

    async init() {
        this.googlePlaces.initMap();
        /*try {
            const localizacaoAtual = await this.pegarLocalizacao();
            console.log(localizacaoAtual);
        } catch (error) {
            console.error('Erro ao inicializar:', error);
        }*/
    }

    async pegarLocalizacao() {
        try {
            let localizacaoAtual = await this.location.getCurrentLocation();
            return localizacaoAtual;
        } catch (error) {
            console.error('Erro ao obter a localização:', error);
            throw error;
        }
    }
}

module.exports = Controller;