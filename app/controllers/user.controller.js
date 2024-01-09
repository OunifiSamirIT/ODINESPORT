const db = require('../models')
const User = db.user
const Op = db.Sequelize.Op
const sql = db.sequelize

const getPagination = (page, size) => {
  const limit = size ? +size : 9
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, rows, totalPages, currentPage }
}

exports.getUserInfo = (req, res) => {
  const id = req.params.id
  User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      })
    })
}

exports.findAll = (req, res) => {
  const { page, size } = req.query
  const { limit, offset } = getPagination(page, size)

  User.findAndCountAll({
    limit,
    offset,
    attributes: {
      include: [
        [
          sql.fn('DATE_FORMAT', sql.col('createdAt'), '%d-%m-%Y %H:%i:%s'),
          'createdAt',
        ],
        [
          sql.fn('DATE_FORMAT', sql.col('updatedAt'), '%d-%m-%Y %H:%i:%s'),
          'updatedAt',
        ],
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Blogs.',
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Article with id=' + id,
      })
    })
}

exports.changerImage = (req, res) => {
  const id = req.params.id
  var imgsrc = 'http://localhost:8088/uploads/' + req.file.filename
  User.update(
    {
      image: imgsrc || 'file-1666352996111.jpg',
    },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Article with id=' + id,
      })
    })
}