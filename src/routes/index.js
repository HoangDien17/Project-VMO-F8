const express = require('express');
const router = express.Router();
const apiUserRoute = require('./api-user-route');
const apiInforRoute = require('./api-infor-route');
const apiFormRoute = require('./api-form-route');

const UserController = require('../controllers/UserController');
const Auth = require('../middlewares/authenToken');
const Validate = require('../middlewares/validate');

module.exports = (app) => {
  app.use("/api", router);
  router.post("/login", Validate.login, UserController.apiLoginUser);
  router.post("/create", Validate.register, UserController.apiCreateUser);
  apiUserRoute(router);
  apiInforRoute(router);
  apiFormRoute(router);
  
}