const express = require('express');
require('dotenv').config();

const db = require('./src/models');
const app = express();

const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({extended: true}));


db.sequelize.sync()
.then(() => {
  console.log('Connect to database successfully !');
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
  })
})
.catch(err => {
  console.log(err);
})