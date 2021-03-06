// importing packages
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override')
require('dotenv').config({path: 'G:/College/Year4/Osaren_Project/.env'})
require('../backend/bin/connMongo')



// routes
const indexRoute = require('./routes/index')
const route = require('./routes/users')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment');
const userRoute = route.router

// white listed url for frontend (localhost 3000)
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

var corsOptions = {
  origin: whitelist,
  credentials: true,

};

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(methodOverride('_method'))


// call routes here ------
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute)
app.use('/comments', commentRoute)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// GETS RID OF FAVICO ERROR
app.get('/favico.ico', (req, res) => {
  res.sendStatus(404);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
