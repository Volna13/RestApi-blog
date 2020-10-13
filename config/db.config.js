module.exports = {
    HOST: "0.0.0.0",
    USER: "api_user",
    PASSWORD: "api_pwd",
    DB: "api_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};