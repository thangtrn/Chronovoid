const router = require('express').Router();

const {
   getAllProduct,
   createProduct,
   getProductById,
   deleteProduct,
   editProduct
} = require('../controllers/ProductController');

router.get('/', getAllProduct);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.put('/', editProduct)

module.exports = router
