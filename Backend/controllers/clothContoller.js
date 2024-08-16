const mongoose = require('mongoose')
const Product = require('../Models/clothModel');
const { Types } = require('mongoose');
const getClothes = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 })
    res.status(200).json(products)
}

const getClothe = async (req, res) => {
    try {
        const { domain } = req.params;
        console.log(domain);

        if (Types.ObjectId.isValid(domain)) {
            const productById = await Product.findById(domain);
            if (!productById) {
                return res.status(404).json({ error: 'Cloth not found by ID' });
            }
            return res.status(200).json(productById);
        }

        const productsByDomain = await Product.find({ domain: domain });
        if (productsByDomain.length === 0) {
            return res.status(404).json({ error: 'Clothes not found by domain' });
        }
        res.status(200).json(productsByDomain);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}






const addCloth = async (req, res) => {
    try {
        const { domain, heading, description, care, material, price } = req.body;
        const images = req.files.map(file => file.path);

        // Validate required fields
        if (!domain || !heading || !description || !care || !material || !price || images.length === 0) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate and parse sizes field
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(req.body.sizes); // Assuming sizes is sent as a JSON string
            if (typeof parsedSizes !== 'object') {
                throw new Error('Sizes must be an object');
            }
        } catch (error) {
            return res.status(400).json({ error: 'Invalid sizes format' });
        }

        // Convert object to array of size objects [{ name: 'S', amount: 10 }, ...]
        const sizesArray = Object.keys(parsedSizes).map(key => ({
            name: key,
            amount: parsedSizes[key].amount // Assuming each size object has 'amount' property
        }));

        // Create new product instance
        const product = new Product({
            domain,
            heading,
            description,
            care,
            material,
            price,
            images,
            sizes: sizesArray
        });

        // Save product to the database
        await product.save();

        // Respond with created product
        res.status(201).json(product);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};


const removeProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }


    const product = await Product.findOneAndDelete({ _id: id })
    if (!product) {
        return res.status(400).json({ error: 'No such product' })
    }
    res.status(200).json(product)
}

const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }


    const product = await Product.findById({ _id: id })
    if (!product) {
        return res.status(400).json({ error: 'No such product' })
    }
    res.status(200).json(product)
}


const searchClothes = async (req, res) => {
    const { query } = req.params;
    console.log(query)
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {

        const searchRegex = new RegExp(query, 'i');
        const products = await Product.find({
            $or: [
                { heading: searchRegex },

                { domain: searchRegex }
            ]
        });

        if (products.length === 0) {
            return res.status(404).json({ error: 'No products found matching the query' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getClothes,
    getClothe,
    addCloth,
    removeProduct,
    getProduct,
    searchClothes

};


