const express = require('express');
const router = express.Router();
const apiUserRoute = require('./api-user-route');
const apiInforRoute = require('./api-infor-route');
const apiFormRoute = require('./api-form-route');

const UserController = require('../controllers/UserController');
const HomeController = require('../controllers/HomeController');
const Auth = require('../middlewares/authenToken');

module.exports = (app) => {
  app.use("/api", router);
  router.post("/login", UserController.apiLoginUser);
  router.post("/create", UserController.apiCreateUser);
  apiUserRoute(router);
  apiInforRoute(router);
  apiFormRoute(router);
  
  app.use("/", Auth, HomeController.index)
}