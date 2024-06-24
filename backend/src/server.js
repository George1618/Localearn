require('dotenv').config();
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyClboIbYYOloGtyxQGiBuk35jQw_SKJnFc",
    authDomain: "localearn-687d1.firebaseapp.com",
    projectId: "localearn-687d1",
    storageBucket: "localearn-687d1.appspot.com",
    messagingSenderId: "658807721967",
    appId: "1:658807721967:android:c6d7e3cf28d27504edf01a"
};

const Firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(Firebaseapp);
const router = require('./routes/routes.js');
const authRouter = require('./routes/Auth.js');
const userRouter = require('./routes/User.js');

/*const admin = require('firebase-admin');
const serviceAccount = require('./services/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://localearn-687d1.firebaseio.com'
});*/

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/localearn", router);
app.use("/auth", authRouter);
app.use("/user", userRouter);

<<<<<<< HEAD
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${process.env.PORT}`);
=======
const port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`);
>>>>>>> 849f230d7e30fec07c58a26fc8c7f0021965b5df
});

module.exports = app;