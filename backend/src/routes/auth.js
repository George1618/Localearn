const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require('../services/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://localearn-687d1.firebaseio.com'
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userCredential.uid);

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
    const { email, password, username, isTeacher } = req.body;
  
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      await user.updateProfile({
        displayName: username
      });
  
      const userData = {
        email: user.email,
        nome: username,
      };
  
      const collection = isTeacher ? 'professores' : 'alunos';
      await admin.firestore().collection(collection).doc(user.uid).set(userData);
  
      res.status(201).send({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.get('/checkAuth', async (req, res) => {
    const idToken = req.headers.authorization;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
  
      // Lógica adicional? Verificar dados adicionais do usuário no Firestore?
  
      res.status(200).send({ uid });
    } catch (error) {
      res.status(401).send({ error: 'Não autenticado' });
    }
  });

module.exports = router;
