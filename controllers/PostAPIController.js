const CrawlService = require('../services/CrawlService')

const _getPosts = (req, res) => {
  // let listPostsInfo = []
  // listPostsInfo.push({
  //       "Content": "PostContent",
  //       "Link": "https://facebook.com",
  //       "NumComment": "NumComment",
  //       "NumLike": "NumLike",
  //       "NumShare": "NumShare",
  //       "PostType": "Status",
  //       "AdditionalInfo": "AdditionalInfo",
  //       "CreatedTime": "CreatedTime",
  //       "Page": "Page",
  //     })

  // CrawlService.getComments('justmenvietnam', 3)
  // .then((listPostsInfo) => {
  //   res.status(200)
  //   .json(listPostsInfo)
  // })
  // .catch((error) => {
  //   console.log(`Error while calling getComments.........`)
  //   throw error
  // })
  res.status(200)
}

module.exports = {
  getPosts: _getPosts,
}