const router = require('express').Router();
const { login, register, getAllUser, updateProfile, deleteUser } = require('../controllers/AuthController')

router.get('/users', getAllUser);
router.put('/users', updateProfile);
router.post('/login', login);
router.post('/register', register);
router.delete('/users/:id', deleteUser);

module.exports = router