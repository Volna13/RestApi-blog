module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        // userId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        // },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        body: {
            type: Sequelize.STRING,
        },
    }, {timestamps: true});

    return Post;
};