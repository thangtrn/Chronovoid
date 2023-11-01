const router = require('express').Router();
const { getAllCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController')

router.get('/', getAllCategory);
router.post('/', createCategory);
router.put('/', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router