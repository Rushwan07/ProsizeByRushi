const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getClothes, getClothe, addCloth, removeProduct, getProduct, searchClothes } = require('../controllers/clothContoller');

router.get('/', getClothes);
router.get('/:domain', getClothe);
router.post('/', upload, addCloth);
router.delete('/:id', removeProduct);
router.get('/:id', getProduct);
router.get('/search/:query', searchClothes);

module.exports = router;
