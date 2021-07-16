const schemaUser = require("../validation/schema.user");
const schemaForm = require("../validation/schema.form");
let validation = (SchemaItem) => {
  return async (req, res, next) => {
    let option = { abortEarly: false };
    let value = await SchemaItem.validate(req.body, option);
    if (value.error) {
      const { details } = value.error;
      const message = details.map((i) => i.message);
      res.status(400).json({
        success: 0,
        message: message,
      });
    } else {
      next();
    }
  };
};

let register = validation(schemaUser.registerSchema);
let login = validation(schemaUser.loginSchema);
let createInfor = validation(schemaUser.createInforSchema);
let updateInfor = validation(schemaUser.updateInforSchema);

let createForm = validation(schemaForm.createFormSchema);

module.exports = { register, login, createInfor, updateInfor, createForm };
