const express = require('express');
const router = express.Router();

const FormController = require('../controllers/FormController');
const Authorization = require('../middlewares/authorization');
const AuthenToken = require('../middlewares/authenToken');

module.exports = (fix) => {
  fix.use("/forms", AuthenToken, router);
  router.post("/", Authorization.Auth(['Admin', 'Hr']), FormController.apiCreateForm);
  router.get("/", FormController.apiGetFormMySelf);
  router.get("/subordinates", FormController.apiGetFormSubordinates);
  router.get("/all", Authorization.Auth(['Hr']), FormController.apiGetFormAll);
  router.put("/", FormController.apiSubmittedForm);
  router.put("/pending", FormController.apiPendingApprovalForm);
  router.put("/approve", FormController.apiApproveForm);
  router.put("/confirm", Authorization.Auth(['Hr']), FormController.apiConfirmFormByHr);
  router.post("/undone/probationary", Authorization.Auth(['Hr']), FormController.apiGetUndoneProbationary);
  router.post("/undone/Assessment", Authorization.Auth(['Hr']), FormController.apiGetUndoneAssessment);
}
