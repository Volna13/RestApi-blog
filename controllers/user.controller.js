const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const jwtConfig = require("../config/jwt.config");
const errorHandler = require("../utils/errorHandler.utils")

const User = db.users;

// Create and Save a new User
exports.createUser = async (req, res) => {
    //validate request
    if (!req.body.email) {
        res.status(400).send({
            message: "Field Email can`t be empty"
        })
    }
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
            message: "This email is already in use"
        })
    } else {
        try {
            //save user in DB
            User.create(user)
            res.status(201).send(user)
        } catch (e) {
            errorHandler.error500(res, e)
        }
    }
};

// Find and Authorize a new User
exports.loginUser = async (req, res) => {
    const candidate = await User.findOne({where: {email: req.body.email}})
    if (candidate) {
        //compare Password
        const pwdResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (pwdResult) {
            //JWT generation
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id,
            }, jwtConfig.JWT_SECRET, {expiresIn: 60 * 60});

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