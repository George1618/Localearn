const Controller = require('./controllers/Controller.js');
const GooglePlaces = require('./sevices/GooglePlaces.js');
const Location = require('./sevices/Location.js');

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://localearn-687d1.firebaseio.com'
});

const db = admin.firestore();

async function saveAlunoData(id, alunoData) {
  await db.collection('alunos').doc(id).set(alunoData);
}

async function getAlunoData(id) {
  const alunoDoc = await db.collection('alunos').doc(id).get();
  if (alunoDoc.exists) {
    return alunoDoc.data();
  } else {
    console.log('Documento de aluno não encontrado');
    return null;
  }
}

async function saveProfessorData(id, professorData) {
  await db.collection('professores').doc(id).set(professorData);
}

async function getProfessorData(id) {
  const professorDoc = await db.collection('professores').doc(id).get();
  if (professorDoc.exists) {
    return professorDoc.data();
  } else {
    console.log('Documento de professor não encontrado');
    return null;
  }
}

let L = new Location();
let GP = new GooglePlaces();
let C = new Controller(L, GP);
C.init();
