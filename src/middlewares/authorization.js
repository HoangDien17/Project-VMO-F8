const _ = require('lodash')

const Auth = (arrRole) => {
  return (req, res, next) => {
    if(req.payload) {
      if(_.includes(arrRole, req.payload.role)) {
        return next();
      }
      return res.status(403).send({statusCode: 403, message: "Unauthorization!", data: {}})
    }
  }
}

module.exports = {Auth};


