const express = require('express')
const router = express.Router()

const HomeAPIController = require('../controllers/HomeAPIController')
const PostAPIController = require('../controllers/PostAPIController')

router.route('/users')
  .get(HomeAPIController.getUsers)
  .post(HomeAPIController.createUser)

router.get('/users/:username', HomeAPIController.getUser)

router.route('/posts')
  .get(PostAPIController.getPostsInfoFromPage)

module.exports = router