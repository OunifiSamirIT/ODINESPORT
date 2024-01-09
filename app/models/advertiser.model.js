module.exports = (sequelize, Sequelize) => {
  const Advertiser = sequelize.define('advertiser', {
    entreprise: {
      type: Sequelize.STRING,
    },
  })
  return Advertiser
}
