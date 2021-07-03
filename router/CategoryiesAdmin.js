const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const CategoryController = require('../controller/CategoryController')

router.get('/', roleMiddleware(['admin']),  CategoryController.adminIndex)
router.post('/', roleMiddleware(['admin']), CategoryController.adminCreate)
router.get('/:id', roleMiddleware(['admin']), CategoryController.adminShow)
router.put('/:id', roleMiddleware(['admin']), CategoryController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin']), CategoryController.adminDelete)

module.exports = router