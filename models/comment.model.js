module.exports = (sequelize, Sequelize) => {
    // console.log(Sequelize.INTEGER);
    const Comment = sequelize.define("comment", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        // postId: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false,
        // },
        // userId: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false,
        // },
        comment: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },{timestamps : true});

    return Comment;
}