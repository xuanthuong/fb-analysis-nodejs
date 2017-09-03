const CrawlService = require('../services/CrawlService')

const _getPostsInfoFromPage = (req, res) => {
  CrawlService.getPostsInfoFromPage('justmenvietnam', 3)
  .then((listPostsInfo) => {
    res.status(200)
    .json(listPostsInfo)
  })
  .catch((error) => {
    console.log(`Error while calling getComments.........`)
    throw error
  })
}

module.exports = {
  getPostsInfoFromPage: _getPostsInfoFromPage,
}