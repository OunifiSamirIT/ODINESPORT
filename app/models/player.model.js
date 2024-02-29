module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define('player', {
    height: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.STRING,
    },
    PiedFort: {
      type: Sequelize.STRING,
    },
   
    positionPlay: {
      type: Sequelize.STRING,
    },
    positionSecond: {
      type: Sequelize.STRING,
    },
   
    skillsInProfile: {
      type: Sequelize.STRING,
    },
    NumeroWhatsup: {
      type: Sequelize.STRING,
    },
    interets: {
      type: Sequelize.STRING,
    },
    champsoptionelle: {
      type: Sequelize.STRING,
    },
    Licence: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })
  return Player
}
