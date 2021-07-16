const express = require("express");
const router = express.Router();

const FormController = require("../controllers/FormController");
const Authorization = require("../middlewares/authorization");
const AuthenToken = require("../middlewares/authenToken");
const Validate = require("../middlewares/validate");

module.exports = (fix) => {
  fix.use("/forms", AuthenToken, router);
  router.post(
    "/",
    Authorization.Auth(["Admin", "Hr"]),
    Validate.createForm,
    FormController.apiCreateForm
  );
  router.get("/", FormController.apiGetFormMySelf);
  router.get("/subordinates", FormController.apiGetFormSubordinates);
  router.get("/all", Authorization.Auth(["Hr"]), FormController.apiGetFormAll);
  router.put("/", FormController.apiSubmittedForm);
  router.put("/pending", FormController.apiPendingApprovalForm);
  router.put("/approve", FormController.apiApproveForm);
  router.put(
    "/confirm",
    Authorization.Auth(["Hr"]),
    FormController.apiConfirmFormByHr
  );
  router.get(
    "/undone/probationary",
    Authorization.Auth(["Hr"]),
    FormController.apiGetUndoneProbationary
  );
  router.get(
    "/undone/assessment",
    Authorization.Auth(["Hr"]),
    FormController.apiGetUndoneAssessment
  );
  router.delete(
    "/:id",
    Authorization.Auth(["Admin"]),
    FormController.apiDeleteForm
  );
  router.get(
    "/done/assessment",
    Authorization.Auth(["Hr"]),
    FormController.apiGetDoneAssessment
  );
  router.get(
    "/done/probationary",
    Authorization.Auth(["Hr"]),
    FormController.apiGetDoneProbationary
  );
};
