const Product = require('../Models/clothModel');
const User = require('../Models/userModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET);


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
const checkmeout = async (req, res) => {
  try {
    const { product, userId } = req.body;

    const productDocs = await Product.find({ _id: { $in: product.map(p => p._id) } });
    const line_items = product.map((prod) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: prod.heading,
          images: prod.images[0]?.startsWith("http") ? [prod.images[0]] : [],
        },
        unit_amount: Math.round(prod.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/orders",
      cancel_url: "http://localhost:3000/cart",
    });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const prod of productDocs) {
      const cartEntry = prod.addToCart.find((entry) => entry.cart.toString() === userId);
      if (cartEntry) {
        user.purchase.push({
          product: prod._id,
          user_size: cartEntry.user_size
        });
      }
    }

    await user.save();


    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
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
  removeFromCart,
  checkmeout
};
