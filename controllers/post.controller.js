const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config")
const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

/* === Create and Save a new post === */
exports.createPost = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content post can not be empty!",
        });
        return;
    }
    console.log(req)
    await createPost(req, res);
    console.log('SUCCESS: Connected to protected route');
    res.status(200).send({
        message: 'Successful log in',
    });
}

// Create a Post
async function createPost(req, res) {
    const post = {
        title: req.body.title,
        body: req.body.body,
        userId: req.user.userId,
    };

    // Save Tutorial in the database
    try {
        const newPost = await Post.create(post)
        res.status(201).send(newPost);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the Post."
        })
    }
};

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