const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const DashboardController = require('../controllers/DashboardController')
const PostController = require('../controllers/PostController')

router.get('/', HomeController.getIndexView)
router.get('/contact', HomeController.getContactView)
router.get('/dashboard', DashboardController.getComments)
router.post('/dashboard', DashboardController.getComments)
router.get('/postdetail', PostController.showPost)
router.post('/postdetail', PostController.showPost)

router.get('/post/:id', PostController.getPost)

module.exports = router