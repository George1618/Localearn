const admin = require('firebase-admin');

async function getData(req, res) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const email = decodedToken.email;
  
      const userSnapshot = await admin.firestore()
        .collection('professores').where('email', '==', email).get();
        
      if (userSnapshot.empty) {
        const studentSnapshot = await admin.firestore()
          .collection('alunos').where('email', '==', email).get();
          
        if (studentSnapshot.empty) {
          return res.status(404).send({ error: 'User not found' });
        }
        
        const userData = studentSnapshot.docs[0].data();
        return res.status(200).send({ userData, role: 'student' });
      }
  
      const userData = userSnapshot.docs[0].data();
      return res.status(200).send({ userData, role: 'teacher' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
}

async function updateData(req, res) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const { email, nome } = req.body;
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
  
      // Verifica se o usuário existe na coleção de professores
      let userRef = admin.firestore().collection('professores').doc(decodedToken.uid);
      let userSnapshot = await userRef.get();
  
      if (!userSnapshot.exists) {
        // Se não for professor, procura na coleção de alunos
        userRef = admin.firestore().collection('alunos').doc(decodedToken.uid);
        userSnapshot = await userRef.get();
  
        if (!userSnapshot.exists) {
          return res.status(404).send({ error: 'User not found' });
        }
      }
  
      // Atualizar os campos nome e email
      await userRef.update({
        email: email,
        nome: nome
      });
  
      res.status(200).send({ message: 'User data updated successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
}

async function updateLocal(req, res) {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  const { local } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Se não for professor, procura na coleção de alunos
    userRef = admin.firestore().collection('alunos').doc(decodedToken.uid);
    userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Atualizar o campo local
    await userRef.update({
      local: local
    });

    res.status(200).send({ message: 'User data updated successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
    getData,
    updateData,
    updateLocal
};