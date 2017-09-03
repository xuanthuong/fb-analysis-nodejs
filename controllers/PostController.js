const _getPostDetailInfo = (req, res) => {
  const postId = req.params.id
  res.render('post-detail')
}

module.exports = {
  getPostDetailInfo: _getPostDetailInfo,
}