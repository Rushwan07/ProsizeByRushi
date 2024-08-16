const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const addToCartSchema = new Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_size: {
        type: String,
        required: true
    }
});

const productSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    care: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    sizes: [sizeSchema],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    addToCart: [addToCartSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
