const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const jwtConfig = require("../config/jwt.config");
const errorHandler = require("../utils/errorHandler.utils")

const User = db.users;
const {regSchema, loginSchema} = require("../utils/validationSchema")

// Create and Save a new User
exports.createUser = async (req, res, next) => {
    try {
        //validate request
        const result = await regSchema.validateAsync(req.body)

        const salt = bcrypt.genSaltSync(10)
        //create user
        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password: bcrypt.hashSync(result.body.password, salt),
            age: result.age
        };

        const doesExist = await User.findOne({where: {email: result.email}})
        if (doesExist) {
            res.status(409).send({
                message: `This email (${result.email}) is already in use`
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
    } catch (e) {
        if (e.isJoi === true) e.status = 422
        next(e)
    }
};

// Find and Authorize a new User
exports.loginUser = async (req, res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body)

        const candidate = await User.findOne({where: {email: result.email}})
        if (candidate) {
            //compare Password
            const pwdResult = bcrypt.compareSync(result.password, candidate.password)
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
    }catch (e){
        if (e.isJoi === true) e.status = 422
        next(e)
    }
};