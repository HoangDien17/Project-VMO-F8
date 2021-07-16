const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

let apiCreateUser = async (data) => {
  const response = {
    statusCode: 201,
    message: "Create new user successful",
    data: {},
  };

  try {
    const { username, password } = data;
    let user = await db.User.findOne({ where: { username: username } });
    if (user) {
      return {
        statusCode: 400,
        message: "User existed",
        data: {},
      };
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      username: username,
      password: bcrypt.hashSync(password, salt),
    };
    let newUser = await db.User.create(userItem);
    response.data = newUser;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiLoginUser = async (data) => {
  const response = {
    statusCode: 200,
    message: "Login succesful",
    data: {},
  };
  try {
    let { username, password } = data;
    let user = await db.User.findOne({ where: { username: username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: 404,
        message: "Wrong user or password",
        data: {},
      };
    }

    let tokenAccess = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TEXT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    );
    response.data = { user, tokenAccess };
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
    data: {},
  };
  try {
    if (!_.includes(["Admin", "Director", "Hr", "Manager", "Employee"], role)) {
      return {
        statusCode: 400,
        message: "Invalid role update",
        data: {},
      };
    }
    let updateRole = await db.User.update(
      { role: role },
      { where: { id: confirmId } }
    );
    response.data = { updateRole };
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiDeleteUser = async (confirmId) => {
  const response = {
    statusCode: 200,
    message: "Delete User successful",
    data: {},
  };
  try {
    let resultDelete = await db.User.destroy({ where: { id: confirmId } });
    if (resultDelete === 0) {
      return {
        statusCode: 404,
        message: "User was removed from the system",
        data: { resultDelete },
      };
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  response.data = { resultDelete };
  return response;
};

let apiChangePassword = async (confirmId, newPassword) => {
  const response = {
    statusCode: 200,
    message: "Change password user successful",
    data: {},
  };
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let newPasswordHash = bcrypt.hashSync(newPassword, salt);
    let resultUpdate = await db.User.update(
      { password: newPasswordHash },
      { where: { id: confirmId } }
    );
    response.data = resultUpdate;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

let apiGetAllUser = async (limit, page) => {
  const response = {
    statusCode: 200,
    message: "Get all user successful",
    data: {},
  };
  try {
    let resultGetAll = await db.User.findAll({
      include: [{ model: db.Information }],
      limit: limit,
      offset: limit * page,
    });
    response.data = resultGetAll;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

module.exports = {
  apiCreateUser,
  apiLoginUser,
  apiUpdateRole,
  apiDeleteUser,
  apiChangePassword,
  apiGetAllUser,
};
