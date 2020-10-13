module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        body: {
            type: Sequelize.STRING,
        }

    },{timestamps: true});

    return Post;
};