const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const FileController = require('../controller/FileController')

router.put('/:id', roleMiddleware(['admin', 'manager']), FileController.adminCreate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), FileController.adminDelete)

module.exports = router