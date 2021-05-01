const Router = require('express')
const router = new Router()

const UserController = require('../controller/UserController')

router.post('/', UserController.create)
router.get('/:id', UserController.show)

module.exports = router