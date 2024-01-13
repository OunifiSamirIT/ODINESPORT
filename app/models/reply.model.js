module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define("reply", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      commentaireId: {
        type: Sequelize.INTEGER,
      },
    });
  
    Reply.belongsTo(sequelize.models.Commentaires, {
      foreignKey: 'commentaireId',
    });
  
    return Reply;
  };
  