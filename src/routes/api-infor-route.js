const express = require('express');
const router = express.Router();

const InformationController = require('../controllers/InformationController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');

module.exports = (fix) => {
  fix.use("/infor", AuthenToken, router);
  router.post("/", InformationController.apiCreateInfor);
  router.put("/", InformationController.apiUpdateInfor);
  router.get("/", InformationController.apiGetInfor)
 
}