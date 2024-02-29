const { verifySignUp, authJwt } = require('../middleware');

const controller = require('../controllers/auth.controller')

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
    )
    next()
  })
  app.post(
    '/api/auth/signup',
    [
      // verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      upload.single('image'), // Add this line to handle image upload
    ],
    controller.signup
  );

  
  
  app.post('/api/auth/signin', controller.signin)
  app.post('/api/auth/refreshtoken', controller.refreshToken)
  app.get('/api/auth/verify-email', controller.verifyEmail);
  app.get('/api/auth/check-verification/:userId', controller.checkVerificationStatus);
  app.post('/api/auth/forgotPassword', controller.forgotPassword);
  app.post('/api/auth/resetPassword', controller.resetPassword);

}
