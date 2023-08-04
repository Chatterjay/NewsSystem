// 与用户相关的 增删改查

var express = require('express');
const UserControllers = require('../../controllers/admin/UserControllers');
var UserRouter = express.Router();
// 用于处理 multipart/form-data 类型的表单数据中间件
const multer = require('multer')
// 确认文件夹
const upload = multer({ dest: 'public/avatarUploads/' })



UserRouter.post('/adminApi/user/login', UserControllers.login)
UserRouter.post('/adminApi/user/upload', upload.single('file'), UserControllers.upload)
UserRouter.post('/adminApi/user/add', upload.single('file'), UserControllers.add)
// 数据增删改查
UserRouter.get('/adminApi/user/list', UserControllers.getList)
UserRouter.get('/adminApi/user/list/:id', UserControllers.getList)
UserRouter.delete('/adminApi/user/list/:id', UserControllers.delList)
UserRouter.put('/adminApi/user/list/:id', UserControllers.putList)
module.exports = UserRouter;
