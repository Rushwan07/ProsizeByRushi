// controllers/userController.js
const User = require('../Models/userModel');
const Product = require('../Models/clothModel');

const addFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ error: 'User or Product not found' });
        }

        if (product.favorites.includes(userId)) {
            return res.status(400).json({ error: 'Product already in favorites' });
        }

        product.favorites.push(userId);
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a product from user's favorites
const removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        const product = await Product.findById(productId);
        console.log(userId, productId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.favorites = product.favorites.filter(fav => fav.toString() !== userId);
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
        const product = await Product.find({ favorites: userId });
        // console.log(product)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
};
