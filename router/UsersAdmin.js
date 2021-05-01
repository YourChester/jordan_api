const Router = require('express')
const router = new Router()

const UserController = require('../controller/UserController')

router.get('/', UserController.adminIndex)
router.post('/', UserController.adminCreate)
router.get('/:id', UserController.adminShow)
router.put('/:id', UserController.adminUpdate)
router.delete('/:id', UserController.adminDelete)

module.exports = router