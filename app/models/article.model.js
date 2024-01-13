
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
    userId: {  // Add this foreign key
      type: Sequelize.INTEGER,
      references: {
        model: 'users',  // Assuming 'users' is the name of your 'user' table
        key: 'id',
      },
      allowNull: false,
    },
  
  });
 
  return Article;
};
