class Controller{
    constructor(L, GL){
        this.location = L;
        this.googlePlaces = GL;
    }

    async init() {
        try {
            let resultado = await this.googlePlaces.initMap();
            console.log(resultado); // Aqui você pode lidar com o resultado retornado pela função initMap()
        } catch (error) {
            console.error('Erro:', error);
        }
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