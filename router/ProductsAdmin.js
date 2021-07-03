const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const ProductController = require('../controller/ProductController')

router.get('/', roleMiddleware(['admin', 'manager']), ProductController.adminIndex)
router.post('/', roleMiddleware(['admin', 'manager']), ProductController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), ProductController.adminShow)
router.get('/articul/:id', roleMiddleware(['admin', 'manager']), ProductController.adminSearchByArticul)
router.put('/:id', roleMiddleware(['admin', 'manager']), ProductController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), ProductController.adminDelete)

module.exports = router