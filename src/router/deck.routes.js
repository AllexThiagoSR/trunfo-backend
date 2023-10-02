const { Router } = require('express');
const { deckController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateNewDeck = require('../middlewares/validateNewDeck');
const validateDeckUpdate = require('../middlewares/validateDeckUpdate');

const router = Router();

router.post('/', validateToken, validateNewDeck, deckController.create);

router.get('/', validateToken, deckController.getAll);

router.get('/user/:userId', validateToken, deckController.getDeckByUserId);

router.get('/:id', validateToken, deckController.getById);

router.put('/:id', validateToken, validateDeckUpdate, deckController.update);

module.exports = router;
