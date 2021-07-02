const schema = require('../validation/schema');
let validation = (SchemaItem) => {
  return async (req, res, next) => {
    let option = { abortEarly: false}
    let value = await SchemaItem.validate(req.body, option);
    if(value.error) {
      const { details } = value.error; 
      const message = details.map(i => i.message)
      res.status(400).json({
        success: 0,
        message: message
      })
    }
    else {
      next();
    }
  };
}

let register = validation(schema.registerSchema);
let login = validation(schema.loginSchema);
let createInfor = validation(schema.createInforSchema);
let updateInfor = validation(schema.updateInforSchema);

module.exports = {register, login, createInfor, updateInfor};
