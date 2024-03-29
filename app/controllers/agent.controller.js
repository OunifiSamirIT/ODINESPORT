const db = require("../models");
const Agent = db.agent;
const User = db.user;


exports.getAllAgents = (req, res) => {
  Agent.findAll({
    include: [{ model: User, attributes: ['id', 'nom', 'email', 'prenom', 'date_naissance', 'tel', 'login', 'gender', 'nationality', 'countryresidence', 'cityresidence', 'profil', 'image'] }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving agents',
      });
    });
};

exports.updateAgents = async (req, res) => {
  const { iduser } = req.params;

  try {
    const agent = await Agent.findOne({
      where: { iduser : iduser },
    });


    if (!agent) {
      return res.status(404).send({
        message: `User with id=${iduser} not found.`,
      });
    }


    console.log('this is the data recieved' , req.body.totalCareerTransfers)
    // Update user properties
    agent.totalCareerTransfers = req.body.totalCareerTransfers || agent.totalCareerTransfers;
    agent.totalPlayer = req.body.totalPlayer ||agent.totalPlayer
    agent.skills = req.body.skills || agent.skills;

    agent.champsoptionelle = req.body.totalTeam    || agent.champsoptionelle;
    agent.clubCovered  = req.body.club || agent.club
    agent.paysclub  = req.body.paysclub || agent.paysclub

    await agent.save();

    return res.status(200).send({
      message: "User profile updated successfully",
      data: agent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error updating user profile",
    });
  }


 

};



