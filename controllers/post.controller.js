const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

/* === Create and Save a new post === */
exports.createPost = (req, res) => {
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
    Post.create(post)
        .then(console.log(post))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Post."
            });
        });
};

exports.findAllPosts = (req, res) => {
    const title = req.query.title;

    let condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
    Post.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        });
};

/* === Find a single Post with an id === */
exports.findOnePost = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Post with id=" + id
            });
        });
};