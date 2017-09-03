const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const DashboardController = require('../controllers/DashboardController')
const PostController = require('../controllers/PostController')

router.get('/', HomeController.getIndexView)
router.get('/contact', HomeController.getContactView)

router.route('/dashboard')
  .get(DashboardController.getComments)
  .post(DashboardController.getComments)

router.route('/post/:id')
  .get(PostController.getPostDetailInfo)

module.exports = router