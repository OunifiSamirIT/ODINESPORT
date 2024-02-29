module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
        user_id: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },

    })
    return Admin
}
