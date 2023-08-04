

const NewsService = require('../../services/admin/NewsService')

const NewsControllers = {
    add: async (req, res) => {
        // 调用service进行添加数据
        const cover = req.file ? `/newsUploads/${req.file.filename}` : ""
        const { title, content, category, isPublish } = req.body
        await NewsService.add({
            title, content, category: Number(category), isPublish: Number(isPublish), cover, editTime: new Date(), createTime: new Date()

        })
        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    publish: async (req, res) => {
        await NewsService.publish({ ...req.body, editTime: new Date() })
        res.send({
            ActionType: "OK",
        })
    },
    delList: async (req, res) => {
        await NewsService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
        })
    },
    updateList: async (req, res) => {
        const cover = req.file ? `/newsUploads/${req.file}` : ""
        const { title, content, category, isPublish, _id } = req.body
        await NewsService.updateList({
            _id, title, content, category: Number(category), isPublish: Number(isPublish), cover, editTime: new Date()
        })
        res.send({
            ActionType: "OK",
        })
    }
}
module.exports = NewsControllers