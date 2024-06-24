const admin = require('firebase-admin');
const serviceAccount = require('../services/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://localearn-687d1.firebaseio.com'
});

async function signUp(req, res) {
    const { email, password, username, isTeacher } = req.body;

    try {
        const userCredential = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: username
        });

        const user = userCredential;

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
}

async function login(req, res) {
    const idToken = req.headers.authorization?.split(' ')[1];
    console.log('Token JWT recebido:', idToken); // Verifica se o token é recebido corretamente

    if (!idToken) {
        return res.status(401).send({ error: 'Token não fornecido' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        console.log('Token JWT verificado:', uid); // Verifica se o token é verificado corretamente

        // Verifica em qual coleção o usuário está (professores ou alunos)
        let userData;
        const professorDoc = await admin.firestore().collection('professores').doc(uid).get();
        if (professorDoc.exists) {
            userData = professorDoc.data();
        } else {
            const alunoDoc = await admin.firestore().collection('alunos').doc(uid).get();
            if (alunoDoc.exists) {
                userData = alunoDoc.data();
            } else {
                throw new Error('Usuário não encontrado em nenhuma coleção');
            }
        }

        res.status(200).send({ token: idToken, userData });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function checkAuth(req, res) {
    const idToken = req.headers.authorization?.split(' ')[1];

    if (!idToken) {
        return res.status(401).send({ error: 'Token não fornecido' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Lógica adicional? Verificar dados adicionais do usuário no Firestore?

    } catch (error) {
        res.status(401).send({ error: 'Não autenticado' });
    }
}

module.exports = {
    signUp,
    login,
    checkAuth
};