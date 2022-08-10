require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var multer = require('multer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var tokenRouter = require('./routes/token');

var app = express();

var fileStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'asset/foto');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

app.use(multer({storage : fileStorage}).single('foto'));
app.use(cors({ origin:true, credentials:true}))
app.use(logger('dev'));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/token', tokenRouter);
app.use('/posts', postsRouter);

module.exports = app;
