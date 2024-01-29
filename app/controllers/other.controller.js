const {users, player } = require('../models');
const db = require("../models");
const Other = db.other;
const User = db.user;




exports.getOtherByUserId = (req, res) => {
    const userId = req.params.iduser;
  
    db.other.findOne({
      where: { iduser: userId },
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No Other found for userId=${userId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Other for userId=' + userId,
        });
      });
  };