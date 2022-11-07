var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const cors = require('cors');
const session = require('express-session');


//routes
var ownerRouter = require('./routes/owner');
var inventoryClient = require('./routes/inventoryClient');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
var friendsRouter = require('./routes/friends');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'admin',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(cors());
app.all('/', function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/owner', ownerRouter);
app.use('/inventoryClient', inventoryClient);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/friends', friendsRouter);
mongoose.connect('mongodb+srv://binh7302:binh7302@cluster0.5njb2ki.mongodb.net/InfinityAttack?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("ok");

  next(createError(404));
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
