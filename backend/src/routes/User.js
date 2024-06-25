const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');

router.get("/teste", async (req, res) => {
    res.send("Teste!");
});

router.get('/userData', userController.getData);
router.put('/userData', userController.updateData);
router.put('/updateLocal', userController.updateLocal);

module.exports = router;