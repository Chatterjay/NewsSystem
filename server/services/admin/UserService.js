const UserModule = require("../../modules/UserModule")
const UserService = {
    login: async ({ username, password }) => {
        return UserModule.find({ username, password })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModule.updateOne({
                _id
            }, { username, introduction, gender, avatar })
        } else {
            return UserModule.updateOne({
                _id
            }, { username, introduction, gender })
        }
    },
    add: async ({ username, gender, introduction, password, role, avatar }) => {
        return UserModule.create({
            username, gender, introduction, password, role, avatar
        })
    },
    getList: async ({ id }) => {
        if (id) {
            return UserModule.find({ _id: id }, ["username", "introduction", "password", "role"])
        }
        return UserModule.find({}, ["username", "introduction", "gender", "avatar", "role"])
    },
    delList: async ({ _id }) => {
        return UserModule.deleteOne({ _id })
    },
    putList: async (body) => {
        return UserModule.updateOne({ _id: body._id }, body)
    }
}
module.exports = UserService