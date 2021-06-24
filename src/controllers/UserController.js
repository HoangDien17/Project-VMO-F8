const UserService = require('../services/userService');

let apiCreateUser = async (req, res) => {
  const {statusCode, message, data} = await UserService.apiCreateUser(req.body);
  return res.status(statusCode).send({statusCode, message, data});
};

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
