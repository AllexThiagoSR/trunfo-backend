const { Router } = require('express');
const { cardController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateCardUpdate = require('../middlewares/validateCardUpdate');
const validateCardCreate = require('../middlewares/validateCardCreate');

const router = Router();

router.get('/', validateToken, cardController.getAll);

router.get('/:id', validateToken, cardController.getById);

router.post('/', validateToken, validateCardCreate, cardController.create);

router.put('/:id', validateToken, validateCardUpdate, cardController.update);

router.delete('/:id', validateToken, cardController.deleteCard);

module.exports = router;
