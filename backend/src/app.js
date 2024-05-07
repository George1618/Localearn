const Controller = require('./controllers/Controller.js');
const GooglePlaces = require('./sevices/GooglePlaces.js');
const Location = require('./sevices/Location.js');

let L = new Location();
let GP = new GooglePlaces();
let C = new Controller(L, GP);
C.init();