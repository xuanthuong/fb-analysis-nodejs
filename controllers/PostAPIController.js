const CrawlService = require('../services/CrawlService')

const _getPostsInfoFromPage = (req, res) => {
  pageName = req.body.pageName || 'justmenvietnam'
  numPost = req.body.numPost || 1
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