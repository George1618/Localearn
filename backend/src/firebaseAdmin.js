const admin = require('firebase-admin');
const serviceAccount = require('./services/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://localearn-687d1.firebaseio.com'
});

const db = admin.firestore();
module.exports = db;
