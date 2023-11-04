const router = require('express').Router();
const { createOrder, getAllOrder } = require('../controllers/OrderController')

router.get('/', getAllOrder);
router.post('/', createOrder);

module.exports = router