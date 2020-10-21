const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;
const {postSchema} = require("../utils/validationSchema")

/* === Create and Save a new post === */
exports.createPost = async (req, res, next) => {
    try {
        //Validation request
        const validData = await postSchema.validateAsync(req.body);
        await createPost(validData, req, res, next);
        console.log('SUCCESS: Connected to protected route');
        res.status(200).send({
            message: 'Successful log in',
        });
    } catch (e) {
        if (e.isJoi === true) e.status = 422
        next(e)
    }
}

// Create a Post
async function createPost(validData, req, res, next) {
    try {
        const post = {
            title: validData.title,
            body: validData.body,
            userId: req.user.userId,
        };

        // Save Tutorial in the database
        const newPost = await Post.create(post)
        res.status(201).send(newPost);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the Post."
        })
    }
}

exports.findAllPosts = async (req, res) => {
    const title = req.query.title;

    let condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
    try {
        const allPost = await Post.findAll({where: condition})
        res.status(200).send(allPost);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving posts."
        })
    }
}

/* === Find a single Post with an id === */
exports.findOnePost = async (req, res) => {
    const id = req.params.id;

    try {
        const onePost = await Post.findByPk(id);
        res.status(200).send(onePost);
    } catch (e) {
        res.status(500).send({
            message: "Error retrieving Post with id=" + id
        });
    }
};