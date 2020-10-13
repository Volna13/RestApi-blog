var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var postRouter = require('./routes/post');
var commentsRouter = require('./routes/comments');

const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

var corsOptions = {
    origin: "http://localhost:3000"
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

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comments', commentsRouter);

const db = require("./models");
db.sequelize.sync().then(result=>{
    console.log("LOG Config sequelize",result.config);
})
    .catch(err=> console.log(err));


module.exports = app;
