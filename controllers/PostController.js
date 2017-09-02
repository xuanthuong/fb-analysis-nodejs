const _showPost = (req, res) => {
  res.render('post-detail')
}

const _getPost = (req, res) => {
  const postId = req.query.id
  console.log(postId)
  res.send(postId)
}

module.exports = {
  showPost: _showPost,
  getPost: _getPost,
}