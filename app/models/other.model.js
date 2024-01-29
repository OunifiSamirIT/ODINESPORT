module.exports = (sequelize, Sequelize) => {
  const Other = sequelize.define('others', {
    profession: {
      type: Sequelize.STRING,
    },
    skillsAutre: {
      type: Sequelize.STRING,
    },
    iduser: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })
  return Other
}
