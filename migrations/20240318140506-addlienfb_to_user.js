module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'LienFB', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'LienFB');
  }
};