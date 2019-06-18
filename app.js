const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');



const hbs          = require('hbs');


const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash      = require('connect-flash');
const cors       = require('cors');

// mongoose.connect('mongodb://localhost/testing');
mongoose
  .connect('mongodb://localhost/olyMarseille', { useNewUrlParser: true })
  .then((x) => {
    console.log('CONNECTED TO OLYMPIQUE DE MARSEILLE DATABASE(OM)');
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

/*app.use(cors({
  credentials: true,
  origin: ['http://localhost:5000'],
}));*/


app.use(session({
  secret: 'marseille',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


app.use(cors());



const index = require('./routes/index');
app.use('/', index);


// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports = app;
