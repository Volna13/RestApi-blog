var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes');
var authRouter = require('./routes/auth.routes');
var postRouter = require('./routes/post.routes');
var commentsRouter = require('./routes/comments.routes');

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
app.use(bodyParser.urlencoded({extended: true}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter)
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comments', commentsRouter);

const db = require("./models");
db.sequelize.sync()
    .then(result => {
        console.log("\r\nLOG Config sequelize: name db: ", result.config.database);
    })
    .catch(err => console.log(err));


module.exports = app;
