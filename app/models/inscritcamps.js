module.exports = (sequelize, Sequelize) => {
    const Campsinscrit = sequelize.define("inscritcamps", {
       
       
       
        emailsecondaire: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        passport: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        date_validation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fraisinscrit: {
            type: Sequelize.STRING,
            allowNull: false,
        },
       
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
       
        champsoptionnel: {
            type: Sequelize.STRING,
            allowNull: false,
        },


        campsId: {  
            type: Sequelize.INTEGER,
            references: {
              model: 'camps',  
              key: 'id',
            },
            allowNull: false,
          },
        userId: {  
            type: Sequelize.INTEGER,
            references: {
              model: 'users',  
              key: 'id',
            },
            allowNull: false,
          },
    });

    return Campsinscrit;
};
