

let createError  = require('http-errors')   ,
    express      = require('express')       ,
    path         = require('path')          ,
    cookieParser = require('cookie-parser') ,
    logger       = require('morgan')        ,
    indexRouter  = require('./app/routes/index'),
    usersRouter  = require('./app/routes/users'),
    adminRouter  = require('./app/routes/admin'),
    app          = express(),
    cors         = require('cors');
    dbConnect    = require('./app/Utils/connection');



//swagger integration
let swaggerUi            = require('swagger-ui-express'),
    swaggerDocumentAdmin = require('./app/Config/adminSwagger.json');
    app.use('/admin-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentAdmin));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true, origin: true }));


// Routes Integration
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
