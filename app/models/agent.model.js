module.exports = (sequelize, Sequelize) => {
  const Agent = sequelize.define('agents', {
    totalPlayer: {
      type: Sequelize.STRING,
    },
  })
  return Agent
}
