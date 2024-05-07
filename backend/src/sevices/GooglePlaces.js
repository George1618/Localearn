//Classe para chamar a API do GooglePlaces, ele já está conseguindo encontrar lugares próximos, porém precisa de um type especifico (como restaurante), precisamos pegar algo mais geral

const googleMaps = require('@google/maps');
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

class GooglePlaces {
    constructor(){
        this.googleMapsClient = googleMaps.createClient({
            key: googleMapsApiKey
        });
    }

    async initMap() {
        const position = { lat: -3.742344678405128, lng: -38.45512300061021 };

        const request = {
            location: position,
            radius: 20,
            type: 'store'
        }

        this.googleMapsClient.placesNearby(request, (err, response) => {
            if (!err) {
                const places = response.json.results;
                places.forEach(place => {
                    console.log(place.name); // Exemplo de processamento dos lugares
                });
            } else {
                console.error('Erro ao buscar estabelecimentos próximos:', err);
            }
        });

        
    }   
}

module.exports = GooglePlaces;