const db = require("../models");
const Tutorial = db.Posts;
const Op = db.Sequelize.Op;

// Create and Save a new post
exports.createPost = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content post can not be empty!"
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
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};