const db = require("../models");
const Article = db.article;
const Commentaires = db.commentaires;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    if (
      !req.body.titre ||
      !req.body.description ||
      !req.body.userId ||
      !req.body.type ||
      !req.file
    ) {
      res.status(500).send({
        message: "Fill all the infos",
      });
      return;
    } else {
      var imgsrc = "http://localhost:8088/uploads/" + req.file.filename;
      Article.create({
        titre: req.body.titre,
        description: req.body.description,
        image: imgsrc,
        etat: "0",
        userId: req.body.userId,
        type: req.body.type,
      })
        .then((data) => {
          res.status(200).send({
            message: "Success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred",
          });
        });
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying creating Blog: ${error}`);
  }
};




exports.findAll = (req, res) => {
  const { page, size, type } = req.query;
  const { limit, offset } = getPagination(page, size);
  let condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  Article.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: {
      include: [
        [
          sql.fn("DATE_FORMAT", sql.col("createdAt"), "%d-%m-%Y %H:%i:%s"),
          "createdAt",
        ],
        [
          sql.fn("DATE_FORMAT", sql.col("updatedAt"), "%d-%m-%Y %H:%i:%s"),
          "updatedAt",
        ],
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Blogs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Article.findByPk(id, {
    attributes: {
      include: [
        [
          sql.fn("DATE_FORMAT", sql.col("createdAt"), "%d-%m-%Y %H:%i:%s"),
          "createdAt",
        ],
        [
          sql.fn("DATE_FORMAT", sql.col("updatedAt"), "%d-%m-%Y %H:%i:%s"),
          "updatedAt",
        ],
      ],
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Commentaires.destroy({
    where: {
      articleId: id,
    },
  });
  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Articles.",
      });
    });
};
