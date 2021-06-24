const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');

module.exports = (fix) => {
  fix.use("/users", AuthenToken, router);
  router.put("/:id", Authorization.Auth(['Admin']), UserController.apiUpdateRole);
}
