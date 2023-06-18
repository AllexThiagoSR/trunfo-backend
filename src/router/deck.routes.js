const { Router } = require('express');
const { deckController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post('/', validateToken, deckController.create);

router.get('/', validateToken, deckController.getAll);

module.exports = router;
