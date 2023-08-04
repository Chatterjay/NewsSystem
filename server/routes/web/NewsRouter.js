var express = require('express');
const NewsControllers = require('../../controllers/web/NewsControllers');
var NewsRouter = express.Router();

NewsRouter.get('/webApi/news/list', NewsControllers.getList);
NewsRouter.get('/webApi/news/list/:id', NewsControllers.getList);
NewsRouter.get('/webApi/news/topList/', NewsControllers.getTopList);

module.exports = NewsRouter;
