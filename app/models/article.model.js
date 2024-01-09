module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    etat: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
  });
  return Article;
};
