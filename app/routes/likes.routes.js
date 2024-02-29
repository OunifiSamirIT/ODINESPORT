const controller = require('../controllers/likes.controller');

module.exports = function (app) {
 
    app.post('/api/likes/article/:articleId', controller.likeArticle);
  app.post('/api/likes/comment/:commentId', controller.likeComment);
  app.post('/api/likes/reply/:replyId', controller.likeReply);


  app.get('/api/likes/comment/:commentId/count', controller.countLikesForCommentWithEmoji);
    app.get('/api/likes/reply/:replyId/count', controller.countLikesForReplyWithEmoji);
    app.get('/api/likes/article/:articleId/count', controller.countLikesForArticleWithEmoji);
    app.get('/api/likes/article/allLikes', controller.countLikesForAllArticles);
    app.get('/api/likes/comment/allLikes', controller.countLikesForAllComments);
};