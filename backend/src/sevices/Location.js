// A classe Location vai utilizar alguma API para pegar os dados de localização do dispositivo (latitude e longitude) para passar para o controller que vai usar esses dados na chamada da API

class Location {
    constructor() {}

    async getCurrentLocation() {
        try {
            const location = await this.getCurrentLocationFromApi();
            const coordenadas = [location.getLatitude(), location.getLongitude()]
            return coordenadas;
        } catch (error) {
            console.error('Erro ao obter a localização:', error);
            throw error;
        }
    }

    async getCurrentLocationFromApi() {
        return ;
    }
}

module.exports = Location;