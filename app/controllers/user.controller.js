const db = require('../models')
const User = db.user
const FriendRequest = db.friend_requests;

const Op = db.Sequelize.Op
const sql = db.sequelize
var bcrypt = require('bcryptjs')

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

//info of user
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

exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }

    // Check if the user making the request is the owner of the profile
    // You can uncomment this block if you have user authentication enabled
    // if (req.user.id !== user.id) {
    //   return res.status(403).send({
    //     message: "You do not have permission to update this user profile.",
    //   });
    // }

    // Update user properties
    user.nom = req.body.nom || user.nom;
    user.prenom = req.body.prenom || user.prenom;
    user.date_naissance = req.body.date_naissance || user.date_naissance;
    user.gender = req.body.gender || user.gender;
    user.nationality = req.body.nationality || user.nationality;
    user.countryresidence = req.body.countryresidence || user.countryresidence;
    user.cityresidence = req.body.cityresidence || user.cityresidence;
    user.tel = req.body.tel || user.tel;
    user.login = req.body.login || user.login;

    // Check if a new password is provided
    if (req.body.password) {
      // Validate the password
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(400).send({
          message: 'Password must be at least 8 characters long, include at least one uppercase letter, and one special character.',
        });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      user.password = hashedPassword;
    }

    // Handle updating profile picture
    if (req.file && req.file.mimetype.startsWith('image')) {
      // Assuming you have a directory named 'uploads' for storing images
      const imgSrc = "/uploads/" + req.file.filename;
      user.image = imgSrc;
    }

    // Save the updated user profile
    await user.save();

    return res.status(200).send({
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error updating user profile",
    });
  }
};

exports.changerImage = (req, res) => {
  const id = req.params.id
  var imgsrc = '/uploads/' + req.file.filename
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



exports.suggestRandomUsers = async (req, res) => {
  const userId = req.params.id; // The user for whom we are suggesting friends
  try {
    // Find the user with the given ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: `Cannot find User with id=${userId}.`,
      });
    }

    // Get the total number of users in the database
    const totalUsers = await User.count();

    // Generate a random offset to get a random set of users
    const randomOffset = Math.floor(Math.random() * totalUsers);

    // Find random users (excluding the user themselves)
    const suggestedUsers = await User.findAll({
      where: {
        id: {
          [Op.not]: userId, // Exclude the current user
        },
      },
      attributes: {
        exclude: ['password'],
      },
      limit: 5, // Adjust the limit based on how many users you want to suggest
      offset: randomOffset,
    });

    res.send(suggestedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Error suggesting random users.',
    });
  }
};


exports.sendFriendRequest = async (req, res) => {
  try {
    const userId = req.params.id;
    const friendId = req.params.friendId;

    // Check if any existing friend request exists
    const existingRequest = await FriendRequest.findOne({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
        status: 'pending', // Adjust the status based on your implementation
      },
    });

    if (!existingRequest) {
      // If no existing request is found, create a new friend request
      await FriendRequest.create({
        senderId: userId,
        receiverId: friendId,
        status: 'pending', // Adjust the status based on your implementation
      });
    }

    res.send({
      message: 'Friend request sent successfully.',
    });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).send({
      message: 'Error sending friend request.',
    });
  }
};

// exports.getFriendRequests = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     // Find friend requests where the user is either the sender or the receiver
//     const friendRequests = await db.user.findByPk(userId, {
//       include: [
//         {
//           model: db.user,
//           as: 'receiver',
//           through: {
//             model: db.friend_requests,
//             where: { status: 'pending' },
//           },
//         },
//       ],
//     });

//     if (!friendRequests) {
//       return res.status(404).send({
//         message: `Cannot find User with id=${userId}.`,
//       });
//     }

//     // Check if there are any friend requests with the status 'pending' and receiver has content
//     if (
//       friendRequests.receiver &&
//       friendRequests.receiver.length > 0
//     ) {
//       res.send(friendRequests);
//     } else {
//       res.send({
//         message: 'No pending friend requests found for the user with content in the receiver.',
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       message: 'Error fetching friend requests.',
//     });
//   }
// };

exports.getFriendRequests = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find friend requests where the user is either the sender or the receiver
    const friendRequests = await db.user.findByPk(userId, {
      include: [
        {
          model: db.user,
          as: 'receiver',
          through: {
            model: db.friend_requests,
            where: { status: 'pending' },
          },
        },
      ],
    });

    // if (!friendRequests) {
    //   return res.status(404).send({
    //     message: `Cannot find User with id=${userId}.`,
    //   });
    // }

    // Check if there are any friend requests with the status 'pending' and receiver has content
    if (friendRequests.receiver && friendRequests.receiver.length > 0) {
      res.send(friendRequests);
    }
    // No else block here to skip sending a response if there are no pending friend requests
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Error fetching friend requests.',
    });
  }
};



