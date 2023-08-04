const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    cover: {
        type: String,
    },
    editTime: {
        type: Date,
    },
    createTime: {
        type: Date,
    },
})
const ProductModule = mongoose.model('product', ProductSchema);

module.exports = ProductModule