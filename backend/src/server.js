require('dotenv').config();
const express = require('express');
const router = require('./routes/routes.js');
const authRouter = require('./routes/Auth.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/localearn", router);
app.use("/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Rodando em http://localhost:${process.env.PORT}`);
});

module.exports = app;