const CrawlService = require('../services/CrawlService')

const _getPostDetailInfo = (req, res) => {
  const postId = req.params.id
  CrawlService.getCommentsFromPost(postId)
  .then((listComments) => {
    res.render('post-detail', {listComments})
  })
  .catch((error) => {
    throw error
  })
}

module.exports = {
  getPostDetailInfo: _getPostDetailInfo,
}