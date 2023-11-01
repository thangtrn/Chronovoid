const router = require('express').Router();
const { createOrder, getAllProductByOrder } = require('../controllers/OrderController')

router.get('/:userId', getAllProductByOrder);
router.post('/', createOrder);

module.exports = router