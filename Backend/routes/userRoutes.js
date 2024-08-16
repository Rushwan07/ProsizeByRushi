const express = require('express');
const { registerUser, verifyEmail, loginUser } = require('../controllers/userController');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favController');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyEmail);
router.post('/login', loginUser);
router.post('/favorite/add', addFavorite);
router.post('/favorite/remove', removeFavorite);
router.get('/favorite/:userId', getFavorites);

router.post('/add', addToCart);
router.get('/getcart/:userId', getCart);

router.post('/cart/remove', removeFromCart);

module.exports = router;
