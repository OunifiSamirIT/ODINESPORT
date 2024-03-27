const db = require("../models");
const Scout = db.scout;
const User = db.user;


exports.getAllScouts = (req, res) => {
  Scout.findAll({
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

exports.updateScouts = async (req, res) => {
  const { iduser } = req.params;

  try {
    const scout = await Scout.findOne({
      where: { iduser : iduser },
    });


    if (!scout) {
      return res.status(404).send({
        message: `User with id=${iduser} not found.`,
      });
    }
    
    // Update user properties
    scout.engagement = req.body.engagement || scout.nb_joueurdetecter;
    scout.nb_joueurdetecter = req.body.totalPlayer ||scout.nb_joueurdetecter
    scout.paysscout = req.body.paysscout || scout.paysscout;
    scout.skillsscout = req.body.skills    || scout.skillsscout;
    scout.paysscout  = req.body.region || scout.paysscout
    await scout.save();

    return res.status(200).send({
      message: "User profile updated successfully",
      data: scout,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error updating user profile",
    });
  }


 

};



