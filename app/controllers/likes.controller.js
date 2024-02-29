const db = require("../models");
const Likes = db.Likes;
const Op = db.Sequelize.Op;
const sql = db.sequelize;


exports.likeArticle = async (req, res) => {
    try {
      const { userId, articleId, emoji } = req.body;
  
      // Check if the user has already liked the article
      const existingLike = await Likes.findOne({
        where: { userId, articleId },
      });
  
      if (existingLike) {
        // If like exists, delete it (unlike)
        await Likes.destroy({
          where: { userId, articleId },
        });
  
        res.status(200).send({ message: "Article unliked successfully." });
      } else {
        // If like doesn't exist, create a new like
        const newLike = await Likes.create({
          userId,
          articleId,
          emoji,
        });
  
        res.status(201).send(newLike);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error." });
    }
  };
  
  exports.likeComment = async (req, res) => {
    try {
      const { userId, commentId, emoji } = req.body;
  
      const existingLike = await Likes.findOne({
        where: { userId, commentId },
      });
  
      if (existingLike) {
        await Likes.destroy({
          where: { userId, commentId },
        });
  
        res.status(200).send({ message: "Comment unliked successfully." });
      } else {
        const newLike = await Likes.create({
          userId,
          commentId,
          emoji,
        });
  
        res.status(201).send(newLike);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error." });
    }
  };
  
  exports.likeReply = async (req, res) => {
    try {
      const { userId, replyId, emoji } = req.body;
  
      const existingLike = await Likes.findOne({
        where: { userId, replyId },
      });
  
      if (existingLike) {
        await Likes.destroy({
          where: { userId, replyId },
        });
  
        res.status(200).send({ message: "Reply unliked successfully." });
      } else {
        const newLike = await Likes.create({
          userId,
          replyId,
          emoji,
        });
  
        res.status(201).send(newLike);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error." });
    }
  };



  ///count likes 

  exports.countLikesForCommentWithEmoji = async (req, res) => {
    const { commentId } = req.params;
    const { emoji } = req.query;

    try {
        const likesCount = await Likes.count({
            where: {
                commentId: commentId,
                emoji: emoji || 1, // Default to 1 if emoji is not provided
            }
        });

        res.json({ count: likesCount });
    } catch (error) {
        console.error(`Error counting likes with emoji ${emoji || 1} for comment ${commentId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.countLikesForReplyWithEmoji = async (req, res) => {
    const { replyId } = req.params;
    const { emoji } = req.query;

    try {
        const likesCount = await Likes.count({
            where: {
                replyId: replyId,
                emoji: emoji || 1, // Default to 1 if emoji is not provided
            }
        });

        res.json({ count: likesCount });
    } catch (error) {
        console.error(`Error counting likes with emoji ${emoji || 1} for reply ${replyId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.countLikesForArticleWithEmoji = async (req, res) => {
    const { articleId } = req.params;
    const { emoji } = req.query;

    try {
        const likesCount = await Likes.count({
            where: {
                articleId: articleId,
                emoji: emoji || 1, // Default to 1 if emoji is not provided
            }
        });

        res.json({ count: likesCount });
    } catch (error) {
        console.error(`Error counting likes with emoji ${emoji || 1} for article ${articleId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  



exports.countLikesForAllArticles = async (req, res) => {
    try {
      // Fetch all likes from the Likes table
      const allLikes = await Likes.findAll();
  
      // Create a map to store the count for each articleId
      const likesCountMap = new Map();
  
      // Iterate through each like and update the count in the map
      allLikes.forEach((like) => {
        const articleId = like.articleId;
  
        if (likesCountMap.has(articleId)) {
          // Increment the count if the articleId is already in the map
          likesCountMap.set(articleId, likesCountMap.get(articleId) + 1);
        } else {
          // Initialize the count to 1 if the articleId is not in the map
          likesCountMap.set(articleId, 1);
        }
      });
  
      // Convert the map to an array of objects for the response
      const likesCountForAllArticles = Array.from(likesCountMap, ([articleId, likesCount]) => ({ articleId, likesCount }));
  
      res.json(likesCountForAllArticles);
    } catch (error) {
      console.error('Error counting likes for all articles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
 

//   exports.countLikesForAllComments = async (req, res) => {
//     try {
//       // Fetch all likes from the Likes table
//       const allLikes = await Likes.findAll();
  
//       // Create a map to store the count for each commentId
//       const likesCountMap = new Map();
  
//       // Iterate through each like and update the count in the map
//       allLikes.forEach((like) => {
//         const commentId = like.commentId;
  
//         if (likesCountMap.has(commentId)) {
//           // Increment the count if the commentId is already in the map
//           likesCountMap.set(commentId, likesCountMap.get(commentId) + 1);
//         } else {
//           // Initialize the count to 1 if the commentId is not in the map
//           likesCountMap.set(commentId, 1);
//         }
//       });
  
//       // Convert the map to an array of objects for the response
//       const likesCountForAllComments = Array.from(likesCountMap, ([commentId, likesCount]) => ({ commentId, likesCount }));
  
//       res.json(likesCountForAllComments);
//     } catch (error) {
//       console.error('Error counting likes for all comments:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  

exports.countLikesForAllComments = async (req, res) => {
    try {
      // Fetch all likes from the Likes table
      const allLikes = await Likes.findAll();
  
      // Create a map to store the count for each commentId
      const likesCountMap = new Map();
  
      // Iterate through each like and update the count in the map
      allLikes.forEach((like) => {
        const commentId = like.commentId;
  
        if (commentId !== null) {
          // Only process likes with a non-null commentId
          if (likesCountMap.has(commentId)) {
            // Increment the count if the commentId is already in the map
            likesCountMap.set(commentId, likesCountMap.get(commentId) + 1);
          } else {
            // Initialize the count to 1 if the commentId is not in the map
            likesCountMap.set(commentId, 1);
          }
        }
      });
  
      // Convert the map to an array of objects for the response
      const likesCountForAllComments = Array.from(
        likesCountMap,
        ([commentId, likesCount]) => ({ commentId, likesCount })
      );
  
      res.json(likesCountForAllComments);
    } catch (error) {
      console.error('Error counting likes for all comments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  