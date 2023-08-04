const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const webProductRouter = require('./routes/web/ProductRouter');
const JWT = require('./util/jwt');

require('./config/db.config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(webNewsRouter);
app.use(webProductRouter);
// /adminApi/ *  -后台系统用的
// /webApi/* -企业官网用的
// token中间件
app.use((req, res, next) => {
  if (req.url === '/adminApi/user/login') {
    return next();
  }
  const token = req.headers['authorization'].split(' ')[1];
  if (token) {
    const playLoad = JWT.verify(token);
    if (playLoad) {
      const newToken = JWT.generate(
        {
          username: playLoad.username,
          _id: playLoad._id,
        },
        '2d'
      );
      res.header('authorization', newToken);
      next();
      return;
    }
    res.status(401).send({ errCode: '-1', errInfo: 'token过期' });
  }
});

app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
