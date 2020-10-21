const db = require('../models');

const Post = db.posts;
const { Op } = db.Sequelize;
const { postSchema } = require('../utils/validationSchema');
const ApplicationError = require('../error/applicationError');

/* === Create and Save a new post === */
exports.createPost = async (req, res, next) => {
  try {
    // Validation request
    const validData = await postSchema.validateAsync(req.body);
    await createPost(validData, req, res, next);
    res.status(200).send({
      message: 'Post created',
    });
  } catch (e) {
    if (e.isJoi === true) throw new ApplicationError(e, 422);
  }
};

/* === Create a Post === */
async function createPost(validData, req, res) {
  try {
    const post = {
      title: validData.title,
      body: validData.body,
      userId: req.user.userId,
    };

    // Save Tutorial in the database
    const newPost = await Post.create(post);
    res.status(201).send(newPost);
  } catch (e) {
    throw new ApplicationError('Some error occurred while creating the Post.', 500);
  }
}

/* === Find all Post with an id === */
exports.findAllPosts = async (req, res) => {
  const { title } = req.query;

  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try {
    const allPost = await Post.findAll({ where: condition });
    if (!allPost) {
      throw new ApplicationError('Posts not found', 404);
    } else {
      res.status(200).send(allPost);
    }
  } catch (e) {
    throw new ApplicationError(e.message || 'Some error occurred while retrieving posts.', 404);
  }
};

/* === Find a single Post with an id === */
exports.findOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    const onePost = await Post.findByPk(id);
    if (!onePost) {
      throw new ApplicationError(`Posts with id: ${id} not found`, 404);
    } else {
      res.status(200).send(onePost);
    }
  } catch (e) {
    throw new ApplicationError('Some error occurred while retrieving post', 500);
  }
};
