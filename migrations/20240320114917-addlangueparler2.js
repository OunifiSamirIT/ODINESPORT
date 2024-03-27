module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'langueparlee', {
      // type: Sequelize.STRING,
      type: Sequelize.ARRAY(Sequelize.STRING), 

      allowNull: true, 
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'langueparlee');
  }
};