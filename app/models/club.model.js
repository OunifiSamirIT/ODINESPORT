module.exports = (sequelize, Sequelize) => {
  const Clubs = sequelize.define('clubs', {
    Name: {
      type: Sequelize.STRING,
    },
  })
  return Clubs
}
