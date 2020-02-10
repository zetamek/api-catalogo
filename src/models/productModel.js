const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;