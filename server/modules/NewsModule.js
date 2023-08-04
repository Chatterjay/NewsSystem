const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Number,
    },
    isPublish: {
        type: Number, // 是否发布
    },
    cover: {
        type: String,
        required: true
    },
    editTime: {
        type: Date,
    },
    createTime: {
        type: Date
    }

})
const NewsModule = mongoose.model('news', NewsSchema);

module.exports = NewsModule