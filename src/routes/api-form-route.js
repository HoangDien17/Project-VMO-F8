const express = require('express');
const router = express.Router();

const FormController = require('../controllers/FormController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');

module.exports = (fix) => {
  fix.use("/forms", AuthenToken, router);
  router.post("/", Authorization.Auth(['Admin', 'Hr']), FormController.apiCreateForm);
}
