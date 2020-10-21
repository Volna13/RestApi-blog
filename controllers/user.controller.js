const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const jwtConfig = require('../config/jwt.config');
const ApplicationError = require('../error/applicationError');

const User = db.users;
const { regSchema, loginSchema } = require('../utils/validationSchema');

// Create and Save a new User
exports.createUser = async (req, res, next) => {
  try {
    // validate request
    const validData = await regSchema.validateAsync(req.body);

    const salt = bcrypt.genSaltSync(10);
    // create user
    const user = {
      firstName: validData.firstName,
      lastName: validData.lastName,
      email: validData.email,
      password: bcrypt.hashSync(validData.password, salt),
      age: validData.age,
    };

    const doesExist = await User.findOne({ where: { email: validData.email } });
    if (doesExist) {
      throw new ApplicationError(`This email (${validData.email}) is already in use`, 409);
    } else {
      try {
        // save user in DB
        User.create(user);
        res.status(201).send(user);
      } catch (e) {
        throw new ApplicationError('Some error occurred while creating User.', 500);
      }
    }
  } catch (e) {
    if (e.isJoi === true) throw new ApplicationError(e, 500);
    next(e);
  }
};

// Find and Authorize a new User
exports.loginUser = async (req, res) => {
  try {
    // Validate request
    const validData = await loginSchema.validateAsync(req.body);

    const candidate = await User.findOne({ where: { email: validData.email } });
    if (candidate) {
      // compare Password
      const pwdResult = bcrypt.compareSync(validData.password, candidate.password);
      if (pwdResult) {
        // JWT generation
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate.id,
          },
          jwtConfig.JWT_SECRET,
          { expiresIn: 60 * 60 },
        );

        res.status(200).send({
          token: `Bearer ${token}`,
        });
      } else {
        throw new ApplicationError('Passwords do not match', 401);
      }
    } else {
      throw new ApplicationError('User not found', 404);
    }
  } catch (e) {
    if (e.isJoi === true) throw new ApplicationError(e, 422);
  }
};
