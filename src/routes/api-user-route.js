const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');

module.exports = (fix) => {
  fix.use("/users", AuthenToken, router);
  router.get("/", Authorization.Auth(['Admin']), UserController.apiGetAllUser);
  router.put("/:id", Authorization.Auth(['Admin']), UserController.apiUpdateRole);
  router.delete("/:id", Authorization.Auth(['Admin']), UserController.apiDeleteUser);
  router.patch("/", UserController.apiChangePassword);
}
