const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const GenderController = require('../controller/GenderController')

router.get('/', roleMiddleware(['admin', 'manager']), GenderController.adminIndex)
router.post('/', roleMiddleware(['admin', 'manager']), GenderController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), GenderController.adminShow)
router.put('/:id', roleMiddleware(['admin', 'manager']), GenderController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), GenderController.adminDelete)

module.exports = router