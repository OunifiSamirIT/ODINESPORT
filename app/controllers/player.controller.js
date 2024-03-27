const {users, player } = require('../models');
const db = require("../models");
const Player = db.player;
const User = db.user;
const Op = db.Sequelize.Op
const sql = db.sequelize

exports.getPlayerByUserId = (req, res) => {
    const userId = req.params.iduser;
  
    Player.findOne({
      where: { iduser: userId },
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
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
    Player.findAll({
      include: [{ model: User, attributes: ['id', 'nom', 'email','prenom','date_naissance','tel','login','gender','nationality','countryresidence','cityresidence','profil','image'] }],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving players',
        });
      });
  };


  // exports.updatePlayerByUserId = async (req, res) => {
  //   const userId = req.params.iduser;
  
  //   try {
  //     // Update user information
  //     const [numUpdatedUsers] = await User.update(req.body, {
  //       where: { id: userId },
  //     });
  
  //     // Check if the user was found and updated
  //     if (numUpdatedUsers !== 1) {
  //       return res.status(404).send({
  //         message: `No user found for userId=${userId}.`,
  //       });
  //     }
  
  //     // Update player information
  //     const [numUpdatedPlayers] = await Player.update(req.body, {
  //       where: { iduser: userId },
  //     });
  
  //     // Check if the player was found and updated
  //     if (numUpdatedPlayers !== 1) {
  //       return res.status(404).send({
  //         message: `No player found for userId=${userId}.`,
  //       });
  //     }
  
  //     res.send({
  //       message: 'User and Player information updated successfully.',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({
  //       message: 'Error updating User and Player information.',
  //     });
  //   }
  // };


  // exports.updatePlayerByUserId = async (req, res) => {
  //   const userId = req.params.iduser;
  
  //   try {
  //     // Update player information
  //     const [numUpdatedPlayers] = await Player.update(req.body, {
  //       where: { iduser: userId },
  //     });
  
  //     // Check if the player was found and updated
  //     if (numUpdatedPlayers !== 1) {
  //       return res.status(404).send({
  //         message: `No player found for userId=${userId}.`,
  //       });
  //     }
  
  //     res.send({
  //       message: 'Player information updated successfully.',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send({
  //       message: 'Error updating player information.',
  //     });
  //   }
  // };

  exports.updatePlayerByUserId = async (req, res) => {
    const { iduser } = req.params;
  
    try {
      const player = await Player.findOne({
        where: { iduser : iduser },
      });
     
      console.log('this player ',player)
      if (!player) {
        return res.status(404).send({
          message: `User with id=${iduser} not found.`,
        });
      }
  

      console.log('this is the data recieved' , req.body.club)
      // Update user properties
      player.champsoptionelle = req.body.club || player.champsoptionelle;
      player.height = req.body.height ||player.height
      player.positionPlay = req.body.positionPlay || player.positionPlay;
      player.positionSecond = req.body.positionSecond || player.positionSecond;
      player.skillsInProfile = req.body.skills || player.skillsInProfile;
      player.weight = req.body.weight || player.weight;
      player.PiedFort = req.body.PiedFort || player.PiedFort;
      player.skillsInProfile = req.body.skills || player.skillsInProfile;
      // player.nationality = req.body.nationality || player.nationality;
      // player.countryresidence = req.body.countryresidence || player.countryresidence;
      // player.cityresidence = req.body.cityresidence || player.cityresidence;
      // player.tel = req.body.tel || player.tel;
      // player.login = req.body.login || player.login;
  

      // Handle updating profile picture
      if (req.file) {
        // Assuming you have a directory named 'uploads' for storing images
        const imgSrc = "/uploads/" + req.file.filename;
        player.Licence = imgSrc;
      }
       console.log('data',req.file)
      // Save the updated user profile
      await player.save();
  
      return res.status(200).send({
        message: "User profile updated successfully",
        data: player,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Error updating user profile",
      });
    }
  };
  