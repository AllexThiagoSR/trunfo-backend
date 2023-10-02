const { Router } = require('express');
const { rarityController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.get('/', validateToken, rarityController.getAll);

module.exports = router;
