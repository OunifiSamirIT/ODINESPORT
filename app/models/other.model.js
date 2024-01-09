module.exports = (sequelize, Sequelize) => {
  const Agent = sequelize.define('agents', {
    profession: {
      type: Sequelize.STRING,
    },
    skills: {
      type: Sequelize.STRING,
    },
  })
  return Agent
}
