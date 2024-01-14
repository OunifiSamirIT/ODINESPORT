const {users, player } = require('../models');
const db = require("../models");
const Player = db.player;
const User = db.user;

exports.getPlayerByUserId = (req, res) => {
    const userId = req.params.iduser;
  
    Player.findOne({
      where: { iduser: userId },
      include: [{ model: User, attributes: ['id', 'nom', 'email'] }],
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No player found for userId=${userId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving player for userId=' + userId,
        });
      });
  };
exports.getAllPlayers = (req, res) => {
    player.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving players',
        });
      });
  };