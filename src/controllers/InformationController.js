const multer = require('multer');
const {config} = require('../config/avatar');
const { v4: uuidv4 } = require('uuid');
const InforService = require('../services/inforService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.avatar_directory)
  },
  filename: (req, file, cb) => {
    let math = config.avatar_type;
    if(math.indexOf(file.mimetype) === -1) {
      return cb({message: "Invalid file type."}, null);
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`
    cb(null, avatarName)
  }
});

let avatarUpload = multer({ 
  storage: storage,
  limits: {fileSize: config.avatar_limitsize}
}).single("avatar")

let apiUpdateInfor = (req, res) => {
  avatarUpload(req, res, async (error) => {
    if(error) {
      if (error.code == 'LIMIT_FILE_SIZE') {
        return res.status(400).send({message: "File is too large."})
      }
      return res.status(500).send(error);
    };
    try {
      let itemUpdate = {...(req.body), avatar: req.file.filename}
      const {statusCode, message, data} = await InforService.apiUpdateInfo(req.payload.id, itemUpdate );
      return res.status(statusCode).send({statusCode, message, data});
    } catch (error) {
      res.status(500).send(error);
    }
  })
};

let apiCreateInfor = async (req, res) => {
  const {statusCode, message, data} = await InforService.apiCreateInfor(req.body, req.payload.id);
  return res.status(statusCode).send({statusCode, message, data});
}

let apiGetInfor = async (req, res) => {
  const {statusCode, message, data} = await InforService.apiGetInfor(req.payload.id);
  return res.status(statusCode).send({statusCode, message, data});
}

module.exports = { apiUpdateInfor, apiCreateInfor, apiGetInfor};