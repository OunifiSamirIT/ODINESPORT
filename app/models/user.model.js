module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    date_naissance: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // Ensure the email is not null
      validate: {
        notEmpty: true, // Ensure the email is not an empty string
        isEmail: {
          msg: 'Invalid email format', // Custom error message for invalid email format
        },
      },
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    countryresidence: {
      type: Sequelize.STRING,
    },
    cityresidence: {
      type: Sequelize.STRING,
    },
    profil: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    langueparlee: {
      type: Sequelize.STRING,
    },
    discreptionBio: {
      type: Sequelize.STRING,
    },
    optionalattributs: {
      type: Sequelize.STRING,
    },
    termesConditions: {
      type: Sequelize.STRING,
    },
    partagehorsPL: {
      type: Sequelize.STRING,
    },
    liensSM: {
      type: Sequelize.STRING,
    },
    numWSup: {
      type: Sequelize.STRING,
    },
    statuscompte: {
      type: Sequelize.STRING,
    },
    friends: {
      type: Sequelize.JSON, 
    },
    verificationToken: {
      type: Sequelize.STRING,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    resetToken: {
      type: Sequelize.STRING,
      allowNull: true, // or false based on your schema
    },
    resetTokenExpiration: {
      type: Sequelize.DATE,
      allowNull: true, // or false based on your schema
    },
  })

  return User
}
