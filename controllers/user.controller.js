const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const jwtConfig = require("../config/jwt.config");

const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.createUser = async (req, res) => {
    //validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Field Email can`t be empty"
        })
    }

    //bvrypt
    const salt = bcrypt.genSaltSync(10)
    //create user
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        age: req.body.age
    };

    const candidate = await User.findOne({where: {email: req.body.email}})
    if (candidate) {
        res.status(409).send({
            log: err.message,
            message: "This email is already in use"
        })
    } else {
        try {
            //save user in DB
            User.create(user)
            res.status(201).send(user)
        } catch (e) {
            res.status(500).send({
                message: e.message || "Some error occurred while creating the User."
            })
        }
    }
};

// Find and Authorize a new User
exports.loginUser = async (req, res) => {
    const candidate = await User.findOne({where: {email: req.body.email}})
    if (candidate) {
        //compare Password
        pwdResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (pwdResult) {
            //JWT generation
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id,
            }, jwtConfig.key, {expiresIn: 60 * 60});

            res.status(200).send({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).send({
                message: "Passwords do not match"
            })
        }
    } else {
        res.status(404).send({
            message: "User not found"
        })
    }
};