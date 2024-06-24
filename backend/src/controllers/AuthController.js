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
        console.log(error);
        res.status(400).send({ error: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Autenticação com email e senha
        const uid = req.uid;
        const userCredential = await admin.auth().getUser(uid);
        //const userCredential = await admin.auth().getUserByEmail(email);
        console.log(userCredential.email);
        const token = await admin.auth().createCustomToken(userCredential.uid);

        // Verifica em qual coleção o usuário está (professores ou alunos)
        let userData;
        const professorDoc = await admin.firestore().collection('professores').doc(userCredential.uid).get();
        //const professorDoc = await admin.firestore().collection('professores').doc(userCredential.email).get();
        console.log(professorDoc.data());
        if (professorDoc.exists) {
            userData = professorDoc.data();
        } else {
            const alunoDoc = await admin.firestore().collection('alunos').doc(userCredential.uid).get();
            //const alunoDoc = await admin.firestore().collection('alunos').doc(userCredential.email).get();
            if (alunoDoc.exists) {
                userData = alunoDoc.data();
                console.log(userData);
            } else {
                throw new Error('Usuário não encontrado em nenhuma coleção');
            }
        }

        res.status(200).send({ token, userData });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function checkAuth(req, res) {
    const idToken = req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : null;

    if (!idToken) {
        return res.status(401).send({ error: 'Token não fornecido' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
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