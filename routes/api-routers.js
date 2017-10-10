const express = require('express')
const router = express.Router()

const HomeAPIController = require('../controllers/HomeAPIController')
const PostAPIController = require('../controllers/PostAPIController')
const CommentAPIController = require('../controllers/CommentAPIController')

router.route('/users')
  .get(HomeAPIController.getUsers)
  .post(HomeAPIController.createUser)

router.get('/users/:username', HomeAPIController.getUser)

router.route('/posts')
  .post(PostAPIController.getPostsInfoFromPage)

router.route('/post')
  .post(CommentAPIController.getCommentDetail)

module.exports = router