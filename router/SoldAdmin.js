const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const SoldController  = require('../controller/SoldController')

// router.get('/', roleMiddleware(['admin', 'manager']), SoldController.adminIndex)
router.get('/', SoldController.adminIndex)
router.post('/', roleMiddleware(['admin', 'manager']), SoldController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), SoldController.adminShow)
router.put('/:id', roleMiddleware(['admin', 'manager']), SoldController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), SoldController.adminDelete)

module.exports = router