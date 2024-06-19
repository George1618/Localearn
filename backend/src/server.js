import 'dotenv/config';
import express from 'express';
import router from "./routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(process.env.BASE_ROUTE, router);
app.listen(process.env.PORT);

console.log(`rodando em localhost:${process.env.PORT}${process.env.BASE_ROUTE}/`);