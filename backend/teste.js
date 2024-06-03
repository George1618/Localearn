const wifiScanner = require('node-wifi-scanner');

wifiScanner.scan((err, networks) => {
    if (err) {
        console.error('Erro ao escanear redes Wi-Fi:', err);
    } else {
        console.log('Redes Wi-Fi detectadas:', networks);
    }
});