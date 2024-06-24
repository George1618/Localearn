const express = require('express');
const router = express.Router();

router.get("/teste", async (req, res) => {
  res.send("Teste!");
});

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.get('/checkAuth', authController.checkAuth);

module.exports = router;