const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

const AuthSellerController = require('../controller/AuthSellerController')

router.post('/login', AuthSellerController.login)
router.post('/logout', authMiddleware, AuthSellerController.logout)
router.get('/user-info', authMiddleware, AuthSellerController.getUserInfo)

module.exports = router