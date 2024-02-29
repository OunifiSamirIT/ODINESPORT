module.exports = (sequelize, Sequelize) => {
  const Scout = sequelize.define('scouts', {
    engagement: {
      type: Sequelize.STRING,
    },
    nb_joueurdetecter: {
      type: Sequelize.STRING,
    },
    paysscout: {
      type: Sequelize.STRING,
    },
      //tjs a la fin de process de register
      skillsscout: {
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
  })
  return Scout
}
