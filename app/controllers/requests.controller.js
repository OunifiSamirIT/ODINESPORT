const db = require("../models");
const FriendRequest = db.friend_requests;
const User = db.user;
const Op = db.Sequelize.Op
const sql = db.sequelize

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

exports.acceptFriendRequest = async (req, res) => {
    const senderId = req.query.senderId;
    const receiverId = req.query.receiverId;
    try {
        // Find record based on senderId and receiverId
        const record = await Record.findOne({
            where: {
                senderId: senderId,
                receiverId: receiverId
            }
        });

        // If record is found, update its status to "accepted" and return true, otherwise return false
        if (record) {
            await record.update({ status: 'accepted' });
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error checking and updating record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.deleteFriendRequest = async (req, res) => {
    const senderId = req.params.id;
    const receiverId = req.params.recieverId;
    console.log(senderId,receiverId)
    try {
        // Find record based on senderId and receiverId
        const record = await FriendRequest.findOne({
            where: {
                senderId: senderId,
                receiverId: receiverId
            }
        });

        // If record is found, update its status to "accepted" and return true, otherwise return false
        if (record) {
            await record.destroy();
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error checking and deleting record:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getFriendRequestsById = async (req, res) => {
    const userId = req.params.id;
    const receiverId = req.params.recieverId;

    try {
        // Find record based on senderId and receiverId
        const record = await db.friend_requests.findOne({
            where: {
                senderId: userId,
                receiverId: receiverId,
            }
        });

        // If record is found, return true, otherwise false
        res.json({ exists: record });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error fetching friend requests.',
        });
    }
};

exports.getFriends = async (req, res) => {
    const userId = req.params.id;
    try {
        // Find record based on senderId and receiverId
        const record = await db.friend_requests.findAll({
            where: {
                senderId: userId,
                status: 'accepted',
            },
            include: [
                {
                    model: db.user,
                    as: 'receiver', // Include the receiver user details
                    attributes: ['id', 'nom', 'prenom', 'email', 'image', 'profil'] // Specify which user attributes to include
                }
            ]
        });

        // If record is found, return true, otherwise false
        res.json(record);

        // if (!friendRequests) {
        //   return res.status(404).send({
        //     message: `Cannot find User with id=${userId}.`,
        //   });
        // }

        // Check if there are any friend requests with the status 'pending' and receiver has content
        // if (friendRequests.receiver && friendRequests.receiver.length > 0) {
        //   res.send(friendRequests);
        // }else{
        //   return res.send({message : "nothinbg"})
        // }
        // No else block here to skip sending a response if there are no pending friend requests
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error fetching friend requests.',
        });
    }
};
exports.getPendingFriends = async (req, res) => {
    const userId = req.params.id;
    try {
        // Find record based on senderId and receiverId
        const record = await db.friend_requests.findAll({
            where: {
                senderId: userId,
                status: 'pending',
            },
            include: [
                {
                    model: db.user,
                    as: 'receiver', // Include the receiver user details
                    attributes: ['id', 'nom', 'prenom', 'email', 'image', 'profil'] // Specify which user attributes to include
                }
            ]
        });

        // If record is found, return true, otherwise false
        res.json({ exists: record });

        // if (!friendRequests) {
        //   return res.status(404).send({
        //     message: `Cannot find User with id=${userId}.`,
        //   });
        // }

        // Check if there are any friend requests with the status 'pending' and receiver has content
        // if (friendRequests.receiver && friendRequests.receiver.length > 0) {
        //   res.send(friendRequests);
        // }else{
        //   return res.send({message : "nothinbg"})
        // }
        // No else block here to skip sending a response if there are no pending friend requests
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: 'Error fetching friend requests.',
        });
    }
};