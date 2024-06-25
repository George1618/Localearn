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

async function getDesempenho(req, res) {
  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const email = decodedToken.email;

      const studentSnapshot = await admin.firestore()
          .collection('alunos').where('email', '==', email).get();
      
      if (studentSnapshot.empty) {
          return res.status(404).send({ error: 'User not found' });
      }
      
      const userData = studentSnapshot.docs[0].data();
      const desempenho = userData.desempenho;
      
      const IeQPer = desempenho.IeQAcerto + desempenho.IeQErro > 0 
          ? (desempenho.IeQAcerto / (desempenho.IeQAcerto + desempenho.IeQErro) * 100).toFixed(2) 
          : 0;
      const PCdLPer = desempenho.PCdLAcerto + desempenho.PCdLErro > 0 
          ? (desempenho.PCdLAcerto / (desempenho.PCdLAcerto + desempenho.PCdLErro) * 100).toFixed(2) 
          : 0;
      const PCdTPer = desempenho.PCdTAcerto + desempenho.PCdTErro > 0 
          ? (desempenho.PCdTAcerto / (desempenho.PCdTAcerto + desempenho.PCdTErro) * 100).toFixed(2) 
          : 0;
      const PergEspecPer = desempenho.PergEspecAcerto + desempenho.PergEspecErro > 0 
          ? (desempenho.PergEspecAcerto / (desempenho.PergEspecAcerto + desempenho.PergEspecErro) * 100).toFixed(2) 
          : 0;
      const VerbFrasaisPer = desempenho.VerbFrasaisAcerto + desempenho.VerbFrasaisErro > 0 
          ? (desempenho.VerbFrasaisAcerto / (desempenho.VerbFrasaisAcerto + desempenho.VerbFrasaisErro) * 100).toFixed(2) 
          : 0;
      const advFreqPer = desempenho.advFreqAcerto + desempenho.advFreqErro > 0 
          ? (desempenho.advFreqAcerto / (desempenho.advFreqAcerto + desempenho.advFreqErro) * 100).toFixed(2) 
          : 0;

          const totalAcertos = desempenho.IeQAcerto + desempenho.PCdLAcerto + desempenho.PCdTAcerto + desempenho.PergEspecAcerto + desempenho.VerbFrasaisAcerto + desempenho.advFreqAcerto;
          const totalErros = desempenho.IeQErro + desempenho.PCdLErro + desempenho.PCdTErro + desempenho.PergEspecErro + desempenho.VerbFrasaisErro + desempenho.advFreqErro;
          const totalPer = totalAcertos + totalErros > 0 
              ? (totalAcertos / (totalAcertos + totalErros) * 100).toFixed(2) 
              : 0;

      return res.status(200).send({ 
          Verbos_Frasais: VerbFrasaisPer,
          Preposições_comuns_de_Tempo: PCdTPer,
          Preposições_comuns_de_Lugar: PCdLPer,
          Advérbios_de_Frequência: advFreqPer,
          Intensificadores_e_Quantificadores: IeQPer,
          Perguntas_Específicas: PergEspecPer,
          Total: totalPer
      });
  } catch (error) {
      res.status(400).send({ error: error.message });
  }
}

async function updateDesempenho(req, res) {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  const { categoria, acerto } = req.body;

  try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      // Verifica se é aluno
      const userRef = admin.firestore().collection('alunos').doc(decodedToken.uid);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Obtem os dados do usuário
      const userData = userSnapshot.data();

      // Inicializa o objeto de atualização
      const updateData = {};

      // Define o campo de atualização baseado na categoria e no resultado (acerto ou erro)
      switch (categoria) {
          case "Verbos Frasais":
              if (acerto) {
                  updateData["desempenho.VerbFrasaisAcerto"] = (userData.desempenho.VerbFrasaisAcerto || 0) + 1;
              } else {
                  updateData["desempenho.VerbFrasaisErro"] = (userData.desempenho.VerbFrasaisErro || 0) + 1;
              }
              break;
          case "Preposições comuns de Tempo":
              if (acerto) {
                  updateData["desempenho.PCdTAcerto"] = (userData.desempenho.PCdTAcerto || 0) + 1;
              } else {
                  updateData["desempenho.PCdTErro"] = (userData.desempenho.PCdTErro || 0) + 1;
              }
              break;
          case "Preposições comuns de Lugar":
              if (acerto) {
                  updateData["desempenho.PCdLAcerto"] = (userData.desempenho.PCdLAcerto || 0) + 1;
              } else {
                  updateData["desempenho.PCdLErro"] = (userData.desempenho.PCdLErro || 0) + 1;
              }
              break;
          case "Advérbios de Frequência":
              if (acerto) {
                  updateData["desempenho.advFreqAcerto"] = (userData.desempenho.advFreqAcerto || 0) + 1;
              } else {
                  updateData["desempenho.advFreqErro"] = (userData.desempenho.advFreqErro || 0) + 1;
              }
              break;
          case "Intensificadores e Quantificadores":
              if (acerto) {
                  updateData["desempenho.IeQAcerto"] = (userData.desempenho.IeQAcerto || 0) + 1;
              } else {
                  updateData["desempenho.IeQErro"] = (userData.desempenho.IeQErro || 0) + 1;
              }
              break;
          case "Perguntas Específicas":
              if (acerto) {
                  updateData["desempenho.PergEspecAcerto"] = (userData.desempenho.PergEspecAcerto || 0) + 1;
              } else {
                  updateData["desempenho.PergEspecErro"] = (userData.desempenho.PergEspecErro || 0) + 1;
              }
              break;
          default:
              return res.status(400).send({ error: 'Invalid category' });
      }

      // Atualiza o documento do usuário com os novos dados
      await userRef.update(updateData);

      res.status(200).send({ message: 'User data updated successfully' });
  } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
  }
}

module.exports = {
    getData,
    updateData,
    updateLocal,
    getDesempenho,
    updateDesempenho
};