module.exports = (sequelize, Sequelize) => {
  const Coach = sequelize.define('coachs', {
    totalTeam: {
      type: Sequelize.STRING,
    },
  })
  return Coach
}
