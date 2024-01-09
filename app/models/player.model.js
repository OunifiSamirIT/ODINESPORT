module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define('player', {
    height: {
      type: Sequelize.STRING,
    },
    weight: {
      type: Sequelize.STRING,
    },
   
    
  })
  return Player
}
