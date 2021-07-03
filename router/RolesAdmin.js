const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const RoleController = require('../controller/RoleController')

router.get('/', roleMiddleware(['admin', 'manager']), RoleController.adminIndex)
router.post('/', roleMiddleware(['admin', 'manager']), RoleController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), RoleController.adminShow)
router.put('/:id', roleMiddleware(['admin', 'manager']), RoleController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), RoleController.adminDelete)

module.exports = router