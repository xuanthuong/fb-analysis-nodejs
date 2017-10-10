const CrawlService = require('../services/CrawlService')

const _getCommentDetail = (req, res) => {
  const postId = req.query.postId
  CrawlService.getCommentsFromPost(postId)
  .then((listComments) => {
    res.status(200)
    .json(listComments.Comments)
  })
  .catch((error) => {
    throw error
  })
}

module.exports = {
  getCommentDetail: _getCommentDetail,
}