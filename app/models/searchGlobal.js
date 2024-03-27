module.exports = (sequelize, Sequelize) => {
    const Search = sequelize.define("searchs", {
        lien: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        titre: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
       
        
    
    });

    return Search;
};
