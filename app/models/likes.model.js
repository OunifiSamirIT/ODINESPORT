module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          emoji: {
            type: Sequelize.STRING, // You can change this data type based on your emoji representation needs
            allowNull: true, // Set allowNull to true to allow null values
          },
          articleId: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          commentId: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          replyId: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
      
          userId: {
            type: Sequelize.INTEGER,
          },
        });
  
    
  
    return Likes;
  };
  