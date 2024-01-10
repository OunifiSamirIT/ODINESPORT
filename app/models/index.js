const config = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model.js')(sequelize, Sequelize)
db.player = require('./player.model.js')(sequelize, Sequelize)
db.coach = require('./coach.model.js')(sequelize, Sequelize)
db.agent = require('./agent.model.js')(sequelize, Sequelize)
db.scout = require('./scout.model.js')(sequelize, Sequelize)
db.advertiser = require('./advertiser.model.js')(sequelize, Sequelize)
db.other = require('./other.model.js')(sequelize, Sequelize)

db.role = require('./role.model.js')(sequelize, Sequelize)

db.commentaires = require('./commentaires.model.js')(sequelize, Sequelize)
db.article = require('./article.model.js')(sequelize, Sequelize)

db.refreshToken = require('./refreshToken.model.js')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
})
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})

///////////////////////////////
db.article.belongsToMany(db.user, {
  through: 'commentaires',
  foreignKey: 'articleId',
  otherKey: 'userId',
})
db.user.belongsToMany(db.article, {
  through: 'commentaires',
  foreignKey: 'userId',
  otherKey: 'articleId',
})
//heritage
db.user.hasMany(db.player, {
  as: 'player_user',
  foreignKey: 'iduser',
})
db.player.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.coach, {
  as: 'coach_user',
  foreignKey: 'iduser',
})
db.coach.belongsTo(db.user, { foreignKey: 'iduser' })



db.user.hasMany(db.agent, {
  as: 'agent_user',
  foreignKey: 'iduser',
})
db.agent.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.scout, {
  as: 'scout_user',
  foreignKey: 'iduser',
})
db.scout.belongsTo(db.user, { foreignKey: 'iduser' })



db.user.hasMany(db.advertiser, {
  as: 'advertiser_user',
  foreignKey: 'iduser',
})
db.advertiser.belongsTo(db.user, { foreignKey: 'iduser' })

db.user.hasMany(db.other, {
  as: 'other_user',
  foreignKey: 'iduser',
})
db.other.belongsTo(db.user, { foreignKey: 'iduser' })

db.ROLES = [
  'user',
  'admin',
  'player',
  'coach',
  'agent',
  'scout',
  'advertiser',
  'other',
]
module.exports = db
