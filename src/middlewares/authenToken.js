const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TEXT_SECRET, (err, payload) => {
      if (err) {
        return res
          .status(401)
          .send({ statusCode: 401, message: "Not authorized", data: {} });
      }
      req.payload = payload;
      console.log(payload);
    });
    next();
  } else {
    return res
      .status(401)
      .send({ statusCode: 401, message: "Not authorized", data: {} });
  }
};
