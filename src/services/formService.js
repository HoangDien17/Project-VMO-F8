const { Op } = require('sequelize');
const db = require('../models');
const sequelize = require('sequelize');
const _ = require('lodash');

let apiCreateForm = async (dataClient) => {
  const response = {
    statusCode: 200,
    message: "Create form successful",
    data: {}
  }
  try {
     //Kiểm tra mỗi user - chỉ đc có 1 form chưa closed
     let formNotClosed = await db.Form.findAll({where: {
      [Op.and]: [{UserId: dataClient.UserId}, {status: {[Op.notLike]: '%closed%'}}]
    }})
    if(formNotClosed.length !== 0) {
      return {
        statusCode: 409,
        message: "Only one form not closed exists",
        data: {}
      }
    }
    
    // kiểm tra mỗi user - 1 form thử việc
    let formProbationaryByUser = await db.Form.findOne({where: {
      [Op.and]: [{UserId: dataClient.UserId}, {typeForm: {[Op.like]: `%${dataClient.typeForm}%`}}]
    }})
    if(formProbationaryByUser) {
      if(_.includes(["Probationary"], formProbationaryByUser.typeForm)) {
        return {
          statusCode: 409,
          message: "Form Probationary already exists.",
          data: {}
        }
      }
    }
    // Kiểm tra 1 user - 1 form định kì năm nay đã tồn tại hay chưa.
    let yearNow = new Date().getFullYear();
    let checkFormYearByUser = await db.Form.findOne({where: {
      [Op.and]: [
        {typeForm: {[Op.like]: '%Assessment%'}},
        {UserId: dataClient.UserId}, 
        sequelize.where(sequelize.fn('YEAR', sequelize.col('startDate')), yearNow)
      ]
    }})
    if(checkFormYearByUser) {
      return {
        statusCode: 409,
        message: `Form Assessment of ${yearNow} already exists.`,
        data: {}
      }
    }
    let newItem = {...dataClient, status: "new"}
    let newForm = await db.Form.create(newItem);
    response.data = newForm;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

module.exports = {apiCreateForm}
