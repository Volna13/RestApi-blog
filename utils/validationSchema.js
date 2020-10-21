const joi = require('joi');

const regSchema = joi.object({
  firstname: joi.string().trim().required(),
  lastname: joi.string().trim().required(),
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().min(3).max(30).trim().required(),
  age: joi.number().integer().greater(6).max(120).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().min(3).max(30).trim().required(),
});

const commentSchema = joi.object({
  comment: joi.string().required(),
});

const postComment = joi.object({
  title: joi.string().required(),
  body: joi.string().required(),
});

module.exports = {
  regSchema,
  loginSchema,
  commentSchema,
  postComment,
};
