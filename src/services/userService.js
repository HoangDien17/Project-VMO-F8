const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let apiCreateUser = async (data) => {
  const response = {
    statusCode: 200,
    message: 'Create new user successful',
    data: {},
  };

  try {
    const { username, password } = data;
    let user = await db.User.findOne({ where: { username: username } });
    if (user) {
      return {
        statusCode: 400,
        message: 'User existed',
        data: { user }
      };
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      username: username,
      password: bcrypt.hashSync(password, salt)
    }
    let newUser = await db.User.create(userItem);
  } catch (error) {
    response.statusCode = 500
    response.message = error.message
  }
  return response;
};

let apiLoginUser = async (data) => {
  const response = {
    statusCode: 200,
    message: 'Login succesful',
    data: {}
  }
  try {
    let { username, password} = data;
    let user = await db.User.findOne({where: {username: username}});
    let match = await bcrypt.compare(password, user.password);
    if(!user || !match) {
      return {
        statusCode: 404,
        message: "Wrong user or password",
        data: {}
      }
    }
    
    let tokenAccess = jwt.sign({id: user.id, role: user.role}, process.env.ACCESS_TEXT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_LIFE});
    console.log(tokenAccess)
    response.data = {user, tokenAccess}
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiUpdateRole = async (confirmId, role) => {
  const response = {
    statusCode: 200,
    message: "Update successful",
    data: {}
  }
  try {
    if(!_.includes(['Admin','Director', 'Hr', 'Manager', 'Employee'], role)) {
      return {
        statusCode: 400,
        message: "Invalid role update",
        data: {}
      }
    }
    let updateRole = await db.User.update({role: role}, {where: {id: confirmId}})
    response.data = {updateRole}
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

module.exports = { apiCreateUser, apiLoginUser, apiUpdateRole };
