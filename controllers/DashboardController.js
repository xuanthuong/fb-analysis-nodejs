const CrawlService = require('../services/CrawlService')

const _getComments = (req, res) => {
  // pageName = req.body.fanpageName
  // numPost = req.body.numPost
  // console.log(`Page: ${pageName}` + `, Number of posts: ${numPost}`)
  res.render('posts-list')
}

const _getAllPosts = (req, res) => {
  CrawlService.getPosts('justmenvietnam', 2)
    .then((posts) => {
      // var json = JSON.stringify(eval("(" + posts + ")")) //Does not work
      var json
      try {
        json = JSON.parse(posts)
      } catch (e) {
        console.log("this is not json")
        throw e
      } 
      if (json) {
        console.log(`Data: `, json['data'])
        res.send("OK...")
      } else {
        console.log("No data found")
        res.send("No data found...")
      }
      // res.render('task-list', { logs, })
    })
    .catch((error) => {
      console.log(`Error while calling getPost.........`)
      throw error
    })
}

module.exports = {
  getAllPosts: _getAllPosts,
  getComments: _getComments,
}