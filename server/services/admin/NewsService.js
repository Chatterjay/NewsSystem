const NewsModule = require("../../modules/NewsModule")
const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime, createTime }) => {
        return NewsModule.create({
            title, content, category, isPublish, cover, editTime, createTime
        })
    },
    getList: async ({ _id }) => {
        return _id ? NewsModule.find({ _id }) : NewsModule.find({})
    },
    publish: async ({ _id, editTime, isPublish }) => {
        return NewsModule.updateOne({ _id }, { isPublish, editTime })
    },
    delList: async ({ _id }) => {
        return NewsModule.deleteOne({ _id })
    },
    updateList: async ({ _id, title, content, category, isPublish, cover, editTime }) => {
        if (cover) {
            return NewsModule.updateOne({ _id }, { title, content, category, isPublish, cover, editTime })
        }
        return NewsModule.updateOne({ _id }, { title, content, category, isPublish, editTime })
    }
}
module.exports = NewsService