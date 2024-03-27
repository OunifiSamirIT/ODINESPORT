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
  exports.updateOther = async (req, res) => {
    const { iduser } = req.params;
    try {
      const other = await Other.findOne({
        where: { iduser : iduser },
      });
      if (!other) {
        return res.status(404).send({
          message: `User with id=${iduser} not found.`,
        });
      }
      console.log(req.body.skillsAutre)
      // Update user properties
      other.skillsAutre = req.body.skillsAutre || other.skillsAutre;
      other.profession = req.body.profession ||other.profession
      await other.save();
      return res.status(200).send({
        message: "User profile updated successfully",
        data: other,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Error updating user profile",
      });
    }
  };