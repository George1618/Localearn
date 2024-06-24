// A classe Location vai utilizar alguma API para pegar os dados de localização do dispositivo (latitude e longitude) para passar para o controller que vai usar esses dados na chamada da API
const axios = require('axios');
const wifiScanner = require('node-wifi-scanner');

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

class Location {
    constructor() {}

    async getCurrentLocation() {
        let counter = 0;
        while (true && counter < 5) {
            try {
                const data = await this.getCurrentLocationFromApi();
                const coordenadas = [data.location.lat, data.location.lng];
                return coordenadas;
            } catch (error) {
                console.error('Erro ao obter a localização, tentando novamente...', error.message);
                // Aguarda um curto período antes de tentar novamente para evitar um loop rápido
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            counter++;
        }
        return false;
    }

    getCurrentLocationFromApi() {
        return new Promise((resolve, reject) => {
            wifiScanner.scan((err, networks) => {
                if (err) {
                    console.error('Erro ao escanear redes Wi-Fi:', err);
                    reject(err);
                    return;
                }

                if (networks.length < 2) {
                    reject(new Error('Número insuficiente de redes Wi-Fi detectadas. Pelo menos duas são necessárias.'));
                    return;
                }

                const wifiAccessPoints = networks.map(network => ({
                    macAddress: network.mac,
                    signalStrength: Math.round(network.rssi),
                    signalToNoiseRatio: 0
                }));

                const requestBody = {
                    considerIp: false,
                    wifiAccessPoints: wifiAccessPoints
                };

                const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleMapsApiKey}`;

                axios.post(url, requestBody)
                    .then(response => {
                        const { data } = response;
                        //console.log('Latitude:', data.location.lat);
                        //console.log('Longitude:', data.location.lng);
                        resolve(data);
                    })
                    .catch(error => {
                        console.error('Erro ao obter localização:', error.message);
                        reject(error);
                    });
            });
        });
    }
}

module.exports = Location;