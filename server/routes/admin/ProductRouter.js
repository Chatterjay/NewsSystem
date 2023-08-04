// 与用户相关的 增删改查
var express = require('express');
const productControllers = require('../../controllers/admin/productControllers');
var ProductRouter = express.Router();
// 用于处理 multipart/form-data 类型的表单数据中间件
const multer = require('multer');
// 确认文件夹
const upload = multer({ dest: 'public/productUploads/' });

ProductRouter.post('/adminApi/product/add', upload.single('file'), productControllers.add);
ProductRouter.get('/adminApi/product/list', productControllers.getList);
ProductRouter.post('/adminApi/product/list', upload.single('file'), productControllers.updateList);
ProductRouter.delete('/adminApi/product/list/:id', productControllers.delList);
ProductRouter.get('/adminApi/product/list/:id', productControllers.getList);

module.exports = ProductRouter;
