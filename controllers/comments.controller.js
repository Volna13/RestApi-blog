const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.createComment = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.comment) {
        res.status(400).send({
            message: "Content comment can not be empty!"
        });
        return;
    }

    //Create comment
    const comment = {
        comment: req.body.comment,
        postId: req.params.id
    };

    //Save comment in DB
    Comment.create(comment)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Some error occurred while creating the comment."
            })
        })
};

// Retrieve all Comments from the database.
exports.findAllComment = (req, res) => {
    const postId = req.params.id;

    Comment.findAll({where: {postId: postId}})
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while retrieving comments."
            })
        })

};
