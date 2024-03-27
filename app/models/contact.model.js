module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        emailuser: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nomPrenom: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
       
        
    
    });

    return Contact;
};
