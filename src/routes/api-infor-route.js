const express = require('express');
const router = express.Router();

const InformationController = require('../controllers/InformationController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');
const Validate = require('../middlewares/validate');

module.exports = (fix) => {
  fix.use("/infor", AuthenToken, router);
  router.post("/", Validate.createInfor, InformationController.apiCreateInfor);
  router.put("/", Validate.updateInfor, InformationController.apiUpdateInfor);
  router.get("/", InformationController.apiGetInfor)
 
}