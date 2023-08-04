var express = require('express');
const ProductControllers = require('../../controllers/web/ProductControllers');
var ProductRouter = express.Router();

ProductRouter.get('/webApi/products/list', ProductControllers.getList);
module.exports = ProductRouter;
