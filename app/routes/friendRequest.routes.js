const { authJwt } = require('../middleware')
const controller = require('../controllers/requests.controller')


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
//send fiend Request 
app.post('/api/user/:id/sendFriendRequest/:friendId', controller.sendFriendRequest);
//accept friend Request
app.put('/api/user/:id/acceptFriend/:recieverId', controller.acceptFriendRequest);
//delete friend Request 
app.delete('/api/user/:id/delete/:recieverId', controller.deleteFriendRequest);
//get All Accepted Friend
app.get('/api/user/:id/getFriends', controller.getFriends);
//get all Pending Frinds
app.get('/api/user/:id/getPendingFriends', controller.getPendingFriends);
//check if already friends
app.get('/api/user/:id/checkFriends/:recieverId', controller.getFriendRequestsById);






}