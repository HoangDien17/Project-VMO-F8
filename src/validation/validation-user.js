const { check } = require('express-validator');

let register = [
  check('username', "Username only letters and numbers, 3 - 8 cheracters.")
    .trim()
    .isLength({min:3}, {max: 8})
    .matches(/[A-Za-z0-9]/),
  check('password', "Password only letters and number.")
    .isLength({min: 6})
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,}$/),
  check('repassword', "Repassword don't match.")
    .custom((value, {req}) =>{
        return value === req.body.password
    })
]

module.exports = {register}