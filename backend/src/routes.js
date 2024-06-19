import express from 'express';
const router = express.Router();

import controller from './controllers/Controller.js';

router.get("/teste", async (req, res) => {
    res.send("Teste!");
  });

router.get("/exercicio", controller.getExercicio);

export default router