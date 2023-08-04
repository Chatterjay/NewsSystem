const jsonWebToken = require('jsonwebtoken')
const secret = 'magpie' // token加密密钥
const JWT = {
    // 生成token
    generate(value, expires) {
        return jsonWebToken.sign(value, secret, { expiresIn: expires })
    },
    // 验证token
    verify(token) {
        try {
            return jsonWebToken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}
module.exports = JWT