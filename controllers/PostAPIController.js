const CrawlService = require('../services/CrawlService')

const _getPostsInfoFromPage = (req, res) => {
  pageName = req.query.pageName || 'justmenvietnam'
  numPost = req.query.numPost || 1
  CrawlService.getPostsInfoFromPage(pageName, numPost)
  .then((listPostsInfo) => {
    res.status(200)
    .json(listPostsInfo)
  })
  .catch((error) => {
    throw error
  })
}

module.exports = {
  getPostsInfoFromPage: _getPostsInfoFromPage,
}