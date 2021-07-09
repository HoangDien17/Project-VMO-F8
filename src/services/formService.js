const { Op } = require('sequelize');
const db = require('../models');
const sequelize = require('sequelize');
const _ = require('lodash');
const sendMail = require('../config/mailer');

let apiCreateForm = async (dataClient, id) => {
  const response = {
    statusCode: 200,
    message: "Create form successful",
    data: {}
  }
  try {
    //Kiểm tra mỗi user - chỉ đc có 1 form chưa closed
    let formNotClosed = await db.Form.findAll({
      where: {
        [Op.and]: [{ UserId: dataClient.UserId }, { status: { [Op.notLike]: '%done%' } }]
      }
    })
    if (formNotClosed.length !== 0) {
      return {
        statusCode: 409,
        message: "Only one form not closed exists",
        data: {}
      }
    }

    // kiểm tra mỗi user - 1 form thử việc
    let formProbationaryByUser = await db.Form.findOne({
      where: {
        [Op.and]: [{ UserId: dataClient.UserId }, { typeForm: { [Op.like]: `%${dataClient.typeForm}%` } }]
      }
    })
    if (formProbationaryByUser) {
      if (_.includes(["Probationary"], formProbationaryByUser.typeForm)) {
        return {
          statusCode: 409,
          message: "Form Probationary already exists.",
          data: {}
        }
      }
    }
    // Kiểm tra 1 user - 1 form định kì năm nay đã tồn tại hay chưa.
    let yearNow = new Date().getFullYear();
    let checkFormYearByUser = await db.Form.findOne({
      where: {
        [Op.and]: [
          { typeForm: { [Op.like]: '%Assessment%' } },
          { UserId: dataClient.UserId },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('startDate')), yearNow)
        ]
      }
    })
    if (checkFormYearByUser) {
      return {
        statusCode: 409,
        message: `Form Assessment of ${yearNow} already exists.`,
        data: {}
      }
    }
    let newItem = { ...dataClient, status: "new" }
    let newForm = await db.Form.create(newItem);
   
    let allUser = await db.User.findAll({where: {role: {[Op.like]: "%Employee%"}}, include: 
      [{ model: db.Information, attributes: ['email']}]
    })
    let emailArray = allUser.map(item => item.Information.email);

    let userConfirm = await db.Information.findOne({where: {UserId: dataClient.UserId}});
    let template = `<h1>Thông báo :</h1>
                    <h3>Họ tên: ${userConfirm.firstName} ${userConfirm.lastName}</h3>
                    <h3>Ngày sinh: ${userConfirm.dob}</h3>
                    <h3>Địa chỉ: ${userConfirm.address}</h3>
                    <h3>Email: ${userConfirm.email}</h3>
                    <h3>SĐT: ${userConfirm.phone}</h3>
                    <h3>Form của <span style="color: red">${userConfirm.firstName} ${userConfirm.lastName}</span> <span style="color: green">${dataClient.typeForm}</span> được tạo thành công. </h3>`
    let subject = "TẠO FORM ";

    sendMail(emailArray, subject, template)
    .then(success => {
      console.log(object);
    })
    .catch(error => {
      console.log(success);
    })
    response.data = newForm;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiGetFormMySelf = async (UserId) => {
  const response = {
    statusCode: 200,
    message: "Get form by myself successful",
    data: {}
  }
  try {
    let formMySelf = await db.Form.findAll({ where: { UserId: UserId } });
    response.data = formMySelf;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiGetFormSubordinates = async (UserId, limit, page) => {
  const response = {
    statusCode: 200,
    message: "Get form subordinates successful",
    data: {}
  }
  try {
    let formSubordinates = await db.Form.findAll({ where: { managerId: UserId }, limit: limit, offset: limit*page });
    response.data = formSubordinates;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiGetFormAll = async (limit, page) => {
  const response = {
    statusCode: 200,
    message: "Get form all successful",
    data: {}
  }
  try {
    let formGetAll = await db.Form.findAll({limit: limit, offset: page*limit});
    response.data = formGetAll;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}
// Cần xem lại.......
let apiSubmittedForm = async (dataClient, UserId) => {
  const response = {
    statusCode: 200,
    message: "Update form by myself successful",
    data: {}
  }
  try {
    // Kiểm tra chỉ được chỉnh sửa form của bản thân 
    let checkForm = await db.Form.findOne({ where: { id: dataClient.id } });
    if (checkForm.UserId !== UserId) {
      return {
        statusCode: 403,
        message: "You can't edit form of other user",
        data: {}
      }
    }
    let submitForm = await db.Form.update({ content: dataClient.content, status: "submitted" }, { where: { id: id } }); /// Chú ý 
    response.data = submitForm;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

let apiPendingApprovalForm = async (idForm, UserId) => {
  const response = {
    statusCode: 200,
    message: "Submitted form successful",
    data: {}
  }
  try {
    let checkForm = await db.Form.findOne({ where: { id: idForm } });
    if (checkForm.UserId !== UserId) {
      return {
        statusCode: 403,
        message: "You can't submit form of other user",
        data: {}
      }
    }
    let pendingForm = await db.Form.update({ status: "pending approval" }, { where: { id: idForm } }); /// Chú ý 
    response.data = pendingForm;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiApproveForm = async (dataClient, UserId) => {
  const response = {
    statusCode: 200,
    message: "Approval form successful",
    data: {}
  }
  try {
    // check form 
    let checkForm = await db.Form.findOne({ where: { id: dataClient.id } });
    if (checkForm.managerId !== UserId) {
      return {
        statusCode: 403,
        message: "You are not the manager that can approve this form ",
        data: {}
      }
    }
    let approveForm = await db.Form.update({ status: "approval", comment: dataClient.comment }, { where: { id: dataClient.id } });
    response.data = approveForm;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiConfirmFormByHr = async (idForm) => {
  const response = {
    statusCode: 200,
    message: "Confirm form successful",
    data: {}
  }
  try {
    let formConfirm = await db.Form.findOne({ where: { id: idForm } });
    if(formConfirm) {
      if (!_.includes(['approval'], formConfirm.status ) || Date.now() < new Date(formConfirm.endDate).getTime()) {
        return {
          statusCode: 403,
          message: "You are not qualified to close  form",
          data: {}
        }
      }
      if (_.includes(['approval'], formConfirm.status) &&  Date.now() >= new Date(formConfirm.endDate).getTime()) {
        let confirmForm = await db.Form.update({status: "done"}, {where: {id: idForm}});
        response.data = confirmForm;
      }
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiGetUndoneProbationary = async (limit, page) => {
  const response = {
    statusCode: 200,
    message: "Report form Pobationary",
    data: {}
  }
  try {
    let dateNow = new Date();
    let result = await db.Form.findAndCountAll({where: {
                    [Op.and]: [{typeForm: {[Op.like]: "%Probationary%"}},{[Op.or]: [{status: {[Op.notLike]: "%done%"}}, sequelize.where(sequelize.fn('date', sequelize.col('endDate')), '>', `${dateNow}`)]}]
                  }, limit: limit, offset: page*limit});

    response.data = result;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

let apiGetUndoneAssessment = async (limit, page) => {
  const response = {
    statusCode: 200,
    message: "Report form Assessment",
    data: {}
  }
  try {
    let dateNow = new Date();
    console.log(object);
    let result = await db.Form.findAndCountAll({where: {
                    [Op.and]: [{typeForm: {[Op.like]: "%Assessment%"}},{[Op.or]: [{status: {[Op.notLike]: "%done%"}}, sequelize.where(sequelize.fn('date', sequelize.col('endDate')), '>', `${dateNow}`)]}]
                  }, limit: limit, offset: page*limit});
                  
    response.data = result;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

module.exports = { apiCreateForm, apiGetFormMySelf, apiGetFormSubordinates, apiGetFormAll, apiPendingApprovalForm, apiSubmittedForm, apiApproveForm, apiConfirmFormByHr, apiGetUndoneProbationary, apiGetUndoneAssessment };
