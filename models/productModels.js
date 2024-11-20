const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter  aproduct name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: 
        {
            type: Number,
            reqyured: true,
        },
        image: {
            type: String,
            required: false
        }
    },
        {
            timestamps: true
        }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;