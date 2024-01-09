module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    date_naissance: {
      type: Sequelize.DATE,
    },
    cin: {
      type: Sequelize.INTEGER,
    },
    tel: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    profil: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  })
  return User
}
