var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRoutes = require('./routes/index.routes');
var authRoutes = require('./routes/auth.routes');
var postRoutes = require('./routes/post.routes');
var commentsRoutes = require('./routes/comments.routes');

const bodyParser = require("body-parser");
const cors = require("cors");

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'secretKey');

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

app.use("/", indexRoutes)
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comments', commentsRoutes);

const db = require("./models");
db.sequelize.sync()
    .then(result => {
        console.log("\r\nLOG Config sequelize: name db: ", result.config.database);
    })
    .catch(err => console.log(err));


module.exports = app;
