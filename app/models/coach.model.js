module.exports = (sequelize, Sequelize) => {
  const Coach = sequelize.define('coachs', {
    totalTeam: {
      type: Sequelize.STRING,
    },
    countryCoachedIn: {
      type: Sequelize.STRING,
    },
    footballTactic: {
      type: Sequelize.STRING,
    },
    ClubActuelCoach: {
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

    
     //tjs a la fin de process de register
     skills: {
      type: Sequelize.STRING,
    },
  })
  return Coach
}
