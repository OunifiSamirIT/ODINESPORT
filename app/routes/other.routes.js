const { authJwt } = require('../middleware');
const otherController = require('../controllers/other.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Define the route for retrieving a player by userId
  app.get('/api/other/:iduser', otherController.getOtherByUserId);

  
};
