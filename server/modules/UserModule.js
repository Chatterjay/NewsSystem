const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number, // 性别
        default: 0
    },
    introduction: {
        type: String // 简介
    },
    avatar: {
        type: String, // 头像
    },
    role: {
        type: Number, // 管理员1 编辑2
        required: true
    }
})
const UserModule = mongoose.model('user', UserSchema);

module.exports = UserModule