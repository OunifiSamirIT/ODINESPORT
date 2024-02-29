const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();


var corsOptions = {
 origin: '*'
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// simple route

const db = require('./app/models')
const Role = db.role
db.sequelize.sync().then(() => {
  console.log('Resync Db done !! ...')
  // initial()
})

function initial() {
  Role.create({
    id: 1,
    name: 'admin',
  })
  Role.create({
    id: 2,
    name: 'player',
  })
  Role.create({
    id: 3,
    name: 'coach',
  })
  Role.create({
    id: 4,
    name: 'agent',
  })
  Role.create({
    id: 5,
    name: 'scout',
  })
  Role.create({
    id: 6,
    name: 'advertiser',
  })
  Role.create({
    id: 7,
    name: 'other',
  })
  Role.create({
    id: 8,
    name: 'user',
  })
 
}

app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome!' })
}) //jgjj

app.use(express.static('public'))
app.use('/images', express.static('images'))

const authRouter = require('./app/routes/auth.routes')
authRouter(app)

const articleRouter = require('./app/routes/article.routes')
articleRouter(app)

const commentairesRouter = require('./app/routes/commentaires.routes')
commentairesRouter(app)

const replyRouter = require('./app/routes/reply.routes')
replyRouter(app)

const likesRouter = require('./app/routes/likes.routes')
likesRouter(app)
const campsRouter = require('./app/routes/camps.route')
campsRouter(app)
const userRouter = require('./app/routes/user.routes')
userRouter(app)

const playerRouter = require('./app/routes/player.routes');
const otherRouter = require('./app/routes/other.routes');
const bodyParser = require('body-parser');
playerRouter(app)
otherRouter(app)


const albumRouter = require('./app/routes/album.routes')
albumRouter(app)
const eventRouter = require('./app/routes/event.routes')
eventRouter(app)
const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`)
   // initial()
})
