const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repassword: Joi.ref('password')
});

const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .trim()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const createInforSchema = Joi.object({
  employeeCode: Joi.string()
    .required(),
  firstName: Joi.string()
    .required()
    .alphanum(),
  lastName: Joi.string()
    .required()
    .alphanum(),
  dob: Joi.date()
    .required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp('^(0)[0-9]{9,10}$')),
  address: Joi.string()
    .required(),
  avatar: Joi.string()
    .required(),
  identityCard: Joi.string()
    .required(),
  insuranceNumber: Joi.string()
    .required(),
  dependent: Joi.string()
    .required(),
});

const updateInforSchema = Joi.object({
  employeeCode: Joi.string()
    .optional(),
  firstName: Joi.string()
    .optional()
    .alphanum(),
  lastName: Joi.string()
    .optional()
    .alphanum(),
  dob: Joi.date()
    .optional,
  email: Joi.string()
    .optional()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .optional()
    .pattern(new RegExp('/^(0)[0-9]{9,10}$/')),
  address: Joi.string()
    .optional(),
  avatar: Joi.string()
    .optional(),
  identityCard: Joi.string()
    .optional(),
  insuranceNumber: Joi.string()
    .optional(),
  dependent: Joi.string()
    .optional(),
});

module.exports = { registerSchema, loginSchema, createInforSchema, updateInforSchema };
