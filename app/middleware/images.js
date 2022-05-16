const multer = require('multer');
const { join } = require('path');

const upload = (req, res) => {
  console.log(req);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(__dirname, 'public', 'receitas'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  return multer({ storage }).single('images');
};

module.exports = { upload };
