const Joi = require("joi");

const createFormSchema = Joi.object({
  typeForm: Joi.string().valid("Probationary", "Assessment").required(),
  managerId: Joi.number().required(),
  title: Joi.string().required(),
  unit: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  UserId: Joi.number().required(),
});

module.exports = { createFormSchema };
