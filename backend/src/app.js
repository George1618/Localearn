const Controller = require('./controllers/Controller.js');
const GooglePlaces = require('./sevices/GooglePlaces.js');
const Location = require('./sevices/Location.js');

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/0/project/localearn-687d1/firestore?hl=pt-br'
});

const db = admin.firestore();

async function saveUserData(id, userData) {
  await db.collection('alunos').doc(id).set(userData);
}

async function getUserData(id) {
  const userDoc = await db.collection('alunos').doc(id).get();
  if (userDoc.exists) {
    return userDoc.data();
  } else {
    console.log('Documento não encontrado');
    return null;
  }
}

let L = new Location();
let GP = new GooglePlaces();
let C = new Controller(L, GP);
C.init();