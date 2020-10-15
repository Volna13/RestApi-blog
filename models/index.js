const dbConfig = require("../config/db.config");

const Sequelize  = require('sequelize');

/* === Config DB === */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// console.log(db);
/*=== config connect tables ===*/
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

/*=== config association ===*/
db.posts.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.posts, {
    as: "post",
});

db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.users, {
    as: "user",
});

db.users.hasMany(db.posts, { as: "posts" });
db.posts.belongsTo(db.users, {
    as: "user",
});

module.exports = db;

