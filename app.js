const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentsRoutes = require('./routes/comments.routes');

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
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
