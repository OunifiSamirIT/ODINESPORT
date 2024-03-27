const { authJwt } = require('../middleware');
const playerController = require('../controllers/player.controller');


const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/uploads/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define the route for retrieving a player by userId
  app.get('/api/player/:iduser', playerController.getPlayerByUserId);
  app.get('/api/players', playerController.getAllPlayers);
  app.put('/api/player/:iduser',upload.single("image"), playerController.updatePlayerByUserId);
};
