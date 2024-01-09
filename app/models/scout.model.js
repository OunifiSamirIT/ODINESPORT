module.exports = (sequelize, Sequelize) => {
  const Scout = sequelize.define('scouts', {
    totalPlayer: {
      type: Sequelize.STRING,
    },
  })
  return Scout
}
