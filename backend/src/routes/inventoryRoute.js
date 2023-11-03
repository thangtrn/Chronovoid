const router = require('express').Router();

const {
   createInventory,
   getAllInventory
} = require('../controllers/InventoryController');

router.get('/', getAllInventory);
router.post('/', createInventory);

module.exports = router
