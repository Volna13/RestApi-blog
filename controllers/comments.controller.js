const db = require("../models");
const Comment = db.comments;
const {commentSchema} = require("../utils/validationSchema")

// Create and Save a new Comment
exports.createComment = async (req, res, next) => {
    try {
        // Validate request
        const validData = await commentSchema.validateAsync(req.body)

        //Create comment
        const comment = {
            comment: validData.comment,
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
    } catch (e) {
        if (e.isJoi === true) e.status = 422
        next(e)
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
