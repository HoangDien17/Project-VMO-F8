const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

let apiCreateUser = async (req, res) => {
  let validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    const {statusCode, message, data} = await UserService.apiCreateUser(req.body);
    return res.status(statusCode).send({statusCode, message, data});
  }
  else {
    let errors = Object.values(validationErrors.mapped());
    let arrError = [];
    arrError = errors.map(item=>item.msg)
    res.status(400).send({message: arrError});
    }
}

let apiLoginUser = async (req, res) => {
  const {statusCode, message, data} = await UserService.apiLoginUser(req.body);
  return res.status(statusCode).send({statusCode, message, data});
};

let apiUpdateRole = async (req, res) => {
  let confirmId = req.params.id;
  let role = req.body.role;
  const {statusCode, message, data} = await UserService.apiUpdateRole(confirmId, role);
  return res.status(statusCode).send({statusCode, message, data});
}

module.exports = { apiCreateUser, apiLoginUser, apiUpdateRole }
