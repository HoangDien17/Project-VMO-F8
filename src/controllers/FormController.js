const FormService = require('../services/formService');

let apiCreateForm = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiCreateForm(req.body, req.payload.id);
  return res.status(statusCode).send({statusCode, message, data});
};

let apiGetFormMySelf = async(req, res) => {
  const {statusCode, message, data} = await FormService.apiGetFormMySelf(req.payload.id);
  return res.status(statusCode).send({statusCode, message, data});
};

let apiGetFormSubordinates = async (req, res) => {
  let page = req.query.page;
  const limit = 5;
  const {statusCode, message, data} = await FormService.apiGetFormSubordinates(req.payload.id, limit, page);
  return res.status(statusCode).send({statusCode, message, data});
};

let apiGetFormAll = async (req, res) => {
  let page = req.query.page;
  const limit = 5;
  const {statusCode, message, data} = await FormService.apiGetFormAll(limit, page);
  return res.status(statusCode).send({statusCode, message, data});
};

let apiSubmittedForm = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiSubmittedForm(req.body, req.payload.id); // req.body: content và typeform
  return res.status(statusCode).send({statusCode, message, data});
}

let apiPendingApprovalForm = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiPendingApprovalForm(req.body.id, req.payload.id); 
  return res.status(statusCode).send({statusCode, message, data});
};

let apiApproveForm = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiApproveForm(req.body, req.payload.id); 
  return res.status(statusCode).send({statusCode, message, data});
};

let apiConfirmFormByHr = async (req, res) => {
  const {statusCode, message, data} = await FormService.apiConfirmFormByHr(req.body.id); 
  return res.status(statusCode).send({statusCode, message, data});
};

let apiGetUndoneProbationary = async (req, res) => {
  let page = req.query.page;
  const limit = 5;
  const {statusCode, message, data} = await FormService.apiGetUndoneProbationary(limit, page); 
  return res.status(statusCode).send({statusCode, message, data});
}

let apiGetUndoneAssessment = async (req, res) => {
  let page = req.query.page;
  const limit = 5;
  const {statusCode, message, data} = await FormService.apiGetUndoneAssessment(); 
  return res.status(statusCode).send({statusCode, message, data});
}

module.exports = { apiCreateForm, apiGetFormMySelf, apiGetFormSubordinates, apiGetFormAll, apiPendingApprovalForm, apiSubmittedForm, apiApproveForm, apiConfirmFormByHr, apiGetUndoneProbationary, apiGetUndoneAssessment };
