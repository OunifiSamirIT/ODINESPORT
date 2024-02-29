module.exports = (sequelize, Sequelize) => {
    const Camps = sequelize.define("camps", {
        album_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        Duree: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        payscamps: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        prix: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date_debut: {
            type: Sequelize.STRING,
          },

          date_fin: {
            type: Sequelize.STRING,
          },
        
        userId: {  // Add this foreign key
            type: Sequelize.INTEGER,
            references: {
              model: 'users',  // Assuming 'users' is the name of your 'user' table
              key: 'id',
            },
            allowNull: false,
          },
    });

    return Camps;
};
