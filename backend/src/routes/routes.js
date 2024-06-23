const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller.js');

router.get("/teste", async (req, res) => {
    res.send("Teste!");
});

router.get("/exercicio", controller.getExercicio);
router.post("/localizacao", controller.updateLocalizacao);

module.exports = router;