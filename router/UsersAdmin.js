const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const UserController = require('../controller/UserController')

router.get('/', roleMiddleware(['admin', 'manager']), UserController.adminIndex)
router.post('/', roleMiddleware(['admin', 'manager']), UserController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), UserController.adminShow)
router.put('/:id', roleMiddleware(['admin', 'manager']), UserController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), UserController.adminDelete)

module.exports = router