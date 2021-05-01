const Router = require('express')
const router = new Router()

const AuthSellerController = require('../controller/AuthSellerController')

router.post('/login', AuthSellerController.login)
router.post('/logout', AuthSellerController.logout)
router.get('/user-info', AuthSellerController.getUserInfo)

module.exports = router