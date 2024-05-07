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
        const position = { lat: -3.767272774392214, lng: -38.53435395329283 };

        const request = {
            location: position,
            radius: 30,
            type: 'establishment'
        }
        try {
            let placesPromise = new Promise((resolve, reject) => {
                this.googleMapsClient.placesNearby(request, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
    
            let response = await placesPromise;
            let places = response.json.results;
    
            for (let i in places){
                for (let j in places[i].types){
                    switch(places[i].types[j]){
                        case 'restaurant':
                            return 'restaurant';
                        case 'movie_theater':
                            return 'movie_theater';
                        case 'gym':
                            return 'gym';
                        case 'doctor':
                            return 'doctor';
                        case 'airport':
                            return 'airport';
                        case 'pharmacy':
                            return 'pharmacy';
                        case 'school':
                            return 'school';
                        case 'university':
                            return 'university';
                        case 'museum':
                            return 'museum';
                        case 'church':
                            return 'church';
                        case 'stadium':
                            return 'stadium';
                        case 'zoo':
                            return 'zoo';
                        case 'train_station':
                            return 'train_station';
                        case 'cafe':
                            return 'cafe';
                        case 'bank':
                            return 'bank';
                        default:
                            break;
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao buscar estabelecimentos próximos:', error);
            return null;
        }
    }   
}

module.exports = GooglePlaces;