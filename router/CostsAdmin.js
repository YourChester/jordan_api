const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const CostsController = require('../controller/CostsController')

router.get('/', roleMiddleware(['admin']), CostsController.adminIndex)
router.post('/', roleMiddleware(['admin']), CostsController.adminCreate)
router.get('/:id', roleMiddleware(['admin']), CostsController.adminShow)
router.put('/:id', roleMiddleware(['admin']), CostsController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin']), CostsController.adminDelete)

module.exports = router