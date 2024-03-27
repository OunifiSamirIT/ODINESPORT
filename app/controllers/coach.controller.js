const db = require("../models");
const Coach = db.coach;
const User = db.user;


exports.getAllCoachs = (req, res) => {
  Coach.findAll({
    include: [{ model: User, attributes: ['id', 'nom', 'email', 'prenom', 'date_naissance', 'tel', 'login', 'gender', 'nationality', 'countryresidence', 'cityresidence', 'profil', 'image'] }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving coach',
      });
    });
};

exports.updateCoachs = async (req, res) => {
  const { iduser } = req.params;

  try {
    const coach = await Coach.findOne({
      where: { iduser : iduser },
    });


    if (!coach) {
      return res.status(404).send({
        message: `User with id=${iduser} not found.`,
      });
    }
    console.log('this is the data recieved' , req.body.totalTeam)
    // Update user properties
    coach.totalTeam = req.body.totalTeam || coach.totalTeam;
    coach.countryCoachedIn = req.body.countryCoachedIn ||agent.countryCoachedIn
    coach.footballTactic = req.body.footballTactic || agent.footballTactic;
    coach.ClubActuelCoach = req.body.ClubActuelCoach    || coach.ClubActuelCoach;
    // coach.licence  = req.body.licence || coach.licence
    coach.skills  = req.body.skills || coach.skills

    await coach.save();

    return res.status(200).send({
      message: "coach profile updated successfully",
      data: coach,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error updating coach profile",
    });
  }


 

};



