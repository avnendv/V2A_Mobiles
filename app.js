const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const router = require('./routes');

const app = express();

// .net require
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb', extended: true
}));
app.use(express.urlencoded({
    limit: '50mb', extended: true
}));
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 24*60*60*1000 },
  resave: false,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
router(app);

module.exports = app;
