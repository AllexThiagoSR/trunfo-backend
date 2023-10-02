const { Router } = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');
const validateUpdate = require('../middlewares/validateUpdate');

const router = Router();

router.post('/', validateNewUser, userController.create);

router.get('/', validateToken, userController.getAll);

router.get('/logged', validateToken, userController.getLoggedUser);

router.get('/:id', validateToken, userController.getUserById);

router.patch('/change/password', validateToken, userController.changePassword);

router.put('/update', validateToken, validateUpdate, userController.updateUser);

router.delete('/:id', validateToken, userController.deleteUser);

module.exports = router;
