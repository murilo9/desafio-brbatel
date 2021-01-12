import multer = require('multer');
import path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'dist/pictures/');
  },
  async filename(req, file, cb) {
    console.log('fazendo upload do arquivo');
    const imgExtention = path.extname(file.originalname);
    req.imgExtention = imgExtention;
    const imgId = `image-${new Date().getTime()}`;
    req.imgId = imgId;
    cb(null, imgId + path.extname(file.originalname));
  },
});

export default storage;
