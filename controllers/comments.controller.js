const db = require('../models');
const ApplicationError = require('../error/applicationError');

const Comment = db.comments;
const { commentSchema } = require('../utils/validationSchema');

/* === Create and Save a new Comment === */
exports.createComment = async (req, res) => {
  try {
    // Validate request
    const validData = await commentSchema.validateAsync(req.body);

    // Create comment
    const comment = {
      comment: validData.comment,
      postId: parseInt(req.params.id, 10),
      userId: req.user.userId,
    };

    // Save comment in DB
    try {
      const newComment = await Comment.create(comment);
      res.status(201).send(newComment);
    } catch (e) {
      throw new ApplicationError(e.message || 'Some error occurred while creating the comment', 404);
    }
  } catch (e) {
    if (e.isJoi === true) throw new ApplicationError(e, 422);
  }
};
// Retrieve all Comments from the database.
exports.findAllComments = async (req, res) => {
  const postId = req.params.id;
  try {
    const allComment = await Comment.findAll({ where: { postId } });
    if (!allComment) {
      throw new ApplicationError('No comments found on this post', 404);
    } else {
      res.status(200).send(allComment);
    }
  } catch (e) {
    throw new ApplicationError(e.message || 'Some error occurred while retrieving comments.', 404);
  }
};
