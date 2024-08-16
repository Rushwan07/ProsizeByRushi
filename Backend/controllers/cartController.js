const Product = require('../Models/clothModel');
const User = require('../Models/userModel');


const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartItems = await Product.find({ 'addToCart.cart': userId });

    if (!cartItems.length) {
      return res.status(404).json({ error: 'No items in the cart' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addToCart = async (req, res) => {
  try {
    const { userId, productId, user_size } = req.body;


    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: 'User or Product not found' });
    }
    if (!user_size) {
      return res.status(404).json({ error: 'Please select the size' });
    }

    const cartItem = product.addToCart.find(item => item.cart.toString() === userId);

    if (cartItem) {

      cartItem.user_size = user_size;
    } else {

      product.addToCart.push({ cart: user._id, user_size });
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.addToCart = product.addToCart.filter(item => item.cart.toString() !== userId);

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addToCart,
  getCart,
  removeFromCart
};
