const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

/* === Create and Save a new post === */
exports.createPost = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content post can not be empty!",
        });
        return;
    }

    // Create a Tutorial
    const post = {
        title: req.body.title,
        body: req.body.body,
    };

    // Save Tutorial in the database
    try {
        const newComment = await Post.create(post)
        res.status(201).send(newComment);
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
    }catch(e){
        res.status(500).send({
            message: "Error retrieving Post with id=" + id
        });
    }
};