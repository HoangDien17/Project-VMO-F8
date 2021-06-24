const db = require('../models');
const { Op } = require('sequelize');

let apiUpdateInfo = async (confirmId, item) => {
  const response = {
    statusCode: 200,
    message: "Update information successful",
    data: {}
  }
  try {
    let updateItem = await db.Information.update(item, { where: { UserId: confirmId } });
    response.data = { updateItem };
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiCreateInfor = async (data, id) => {
  const response = {
    statusCode: 200,
    message: 'Create information successful',
    data: {}
  }
  try {
    let newItem = { ...data, UserId: id };
    let newInfor = await db.Information.create(newItem);
    response.data = newInfor;
  } catch (error) {
    response.statusCode = 500,
    response.message = error.message
  }
  return response;
};

let apiGetInfor = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Get Information successful',
    data: {}
  }
  try {
    let viewInfor = await db.Information.findOne({where: {UserId: id}});
    response.data = viewInfor;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

module.exports = { apiUpdateInfo, apiCreateInfor, apiGetInfor }
