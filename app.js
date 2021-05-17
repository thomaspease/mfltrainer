//When running this on a new computer, I had to delete all node modules, and then just reinstall with npm i
//Problems with EACCESS - sudo npm install -g --unsafe-perm=true --allow-root
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const sentenceRouter = require('./routes/sentenceRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const classRouter = require('./routes/classRoutes');
const taskRouter = require('./routes/taskRoutes');
const studentTaskRouter = require('./routes/studentTaskRoutes');
const studentSentenceRouter = require('./routes/studentSentenceRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//---------GLOBAL MIDDLEWARE-----------------------------------
//Set security HTTP headers
app.use(helmet({
  // tweak Content-Security-Policy as needed
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'worker-src': ["'self'", "blob:"],
      'connect-src': ["'self'", "https://mfltrainer-assets.s3.eu-west-2.amazonaws.com/"],
      'media-src': ["'self'", "https://mfltrainer-assets.s3.eu-west-2.amazonaws.com/"],
    }
  },
}));

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
//This could cause issues at school
const limiter = rateLimit({
  max: 5000,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against NOSQL query injections
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['vivaRef', 'grammar', 'level', 'tense'],
  })
);

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//TEST middleware
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

//ROUTES
app.use('/', viewRouter);
app.use('/api/v1/sentences', sentenceRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/classes', classRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/studenttasks', studentTaskRouter);
app.use('/api/v1/studentsentences', studentSentenceRouter);

//A req will only reach here if it hasn't been handled by the other handlers
//The star means all routes
app.all('*', (req, res, next) => {
  //If next ever receives an argument, then express presumes that it is an error, and sends it straight to the global error handling middleware, without going through the other middleware.
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
