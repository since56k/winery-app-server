const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger  = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const routes = require('./routes/api');
const auth = require('./routes/auth');

const response = require('./helpers/response');
const configure = require('./config/passport');

require('./config/database');

const app = express();

app.use(session({
  secret: 'winery-app',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));


//create a cors middleware
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

configure(passport);

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!res.headersSent) {
    response.unexpectedError(req, res, err);
  }
});

// This will be the default route is nothing else is caught
app.use(function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

module.exports = app;
