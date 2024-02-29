module.exports = (sequelize, Sequelize) => {
  const Agent = sequelize.define("agents", {
    totalPlayer: {
      type: Sequelize.STRING,
    },
    totalCareerTransfers: {
      type: Sequelize.STRING,
    },
    clubCovered: {
      type: Sequelize.STRING,
    },
    
    //soit pour des joueurs soit pour une equipe
    typeresponsable: {
      type: Sequelize.STRING,
    },
    
    pays: {
      type: Sequelize.STRING,
    },
    paysclub: {
      type: Sequelize.STRING,
    },
    //tjs a la fin de process de register
    skillsagent: {
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
  });
  return Agent;
};
