module.exports = (sequelize, Sequelize) => {
  const Manager = sequelize.define('managers', {
    totalTeam: {
      type: Sequelize.STRING,
    },
  })
  return Manager
}
