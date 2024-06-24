require('dotenv').config();
const express = require('express');
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

app.listen(process.env.PORT, () => {
    console.log(`Rodando em http://localhost:${process.env.PORT}`);
});

module.exports = app;