const db = require("../models");
const Comment = db.comments;

// Create and Save a new Comment
exports.createComment = async (req, res) => {
    // Validate request
    if (!req.body.comment) {
        res.status(400).send({
            message: "Content comment can not be empty!"
        });
        return;
    }

    //Create comment
    const comment = {
        comment: req.body.comment,
        postId: parseInt(req.params.id),
        userId: req.user.userId
    };

    //Save comment in DB
    try {
        const newComment = await Comment.create(comment);
        console.log(newComment)
        res.status(201).send(newComment);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the comment."
        })
    }
};
// Retrieve all Comments from the database.
exports.findAllComment = async (req, res) => {
    const postId = req.params.id;
    try {
        const allComment = await Comment.findAll({where: {postId: postId}});
        res.status(200).send(allComment);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving comments."
        })
    }
};
