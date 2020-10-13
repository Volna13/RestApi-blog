module.exports = (sequelize, Sequelize) => {
    // console.log(Sequelize.INTEGER);
    const Comment = sequelize.define("Comment", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },{timestamps : true});

    return Comment;
}