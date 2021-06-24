const FormService = require('../services/formService');

let apiCreateForm = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiCreateForm(req.body);
  return res.status(statusCode).send({statusCode, message, data});
};

module.exports = { apiCreateForm }
