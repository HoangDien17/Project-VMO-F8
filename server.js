const path = require("path");
const express = require("express");
require("dotenv").config();

const db = require("./src/models");
const router = require("./src/routes");
const app = express();
const apiDoccument = require("./Project_F8_Swagger.json");
const swagger = require("swagger-ui-express");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static file
app.use(express.static(path.join(__dirname, "public")));

app.use("/apiDoccument", swagger.serve, swagger.setup(apiDoccument));

//router
router(app);

db.sequelize
  .sync()
  .then(() => {
    console.log("Connect to database successfully !");
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
