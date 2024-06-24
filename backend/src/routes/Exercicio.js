const express = require('express');
const router = express.Router();
const exercicioController = require('../controllers/ExercicioController.js');

router.get("/teste", async (req, res) => {
    res.send("Teste!");
});

router.get("/exercicio", exercicioController.getExercicio);
router.post("/exercicio", exercicioController.addExercicio);
router.put("/exercicio", exercicioController.updateExercicio);
router.delete("/exercicio", exercicioController.deleteExercicio);

module.exports = router;