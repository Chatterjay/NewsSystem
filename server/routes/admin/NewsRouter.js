// 与用户相关的 增删改查

var express = require('express');
const NewsControllers = require('../../controllers/admin/NewsControllers');
var NewsRouter = express.Router();
// 用于处理 multipart/form-data 类型的表单数据中间件
const multer = require('multer')
// 确认文件夹
const upload = multer({ dest: 'public/newsUploads/' })

NewsRouter.post('/adminApi/news/add', upload.single('file'), NewsControllers.add)
NewsRouter.get('/adminApi/news/list', NewsControllers.getList)
NewsRouter.post('/adminApi/news/publish', NewsControllers.publish)
NewsRouter.delete('/adminApi/news/list/:id', NewsControllers.delList)
NewsRouter.get('/adminApi/news/list/:id', NewsControllers.getList)
NewsRouter.post('/adminApi/news/list', upload.single('file'), NewsControllers.updateList)


module.exports = NewsRouter;
