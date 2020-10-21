const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentsRoutes = require('./routes/comments.routes');
const ApplicationError = require('./error/applicationError');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comments', commentsRoutes);

/* error handler */
app.use((err, req, res) => {
  // console.log('Error: ', err.message);
  if (err instanceof ApplicationError) {
    res.status(err.getStatus()).json({
      errorMsg: err.message,
    });
  } else {
    res.status(500).json({
      errorMsg: err.message,
    });
  }
});

app.use((req, res) => {
  // console.log('Error 404');
  res.status(500).json({
    errorMsg: 'Error 404. Page not found',
  });
});

/* DB config */
const db = require('./models');

db.sequelize.sync();
// .then((result) => {
//   console.log('\r\nLOG Config sequelize: name db: ', result.config.database);
// })
// .catch((err) => console.log(err));

module.exports = app;
