const Router = require('express')
const router = new Router()

const CategoryController = require('../controller/CategoryController')

router.get('/', CategoryController.adminIndex)
router.post('/', CategoryController.adminCreate)
router.get('/:id', CategoryController.adminShow)
router.put('/:id', CategoryController.adminUpdate)
router.delete('/:id', CategoryController.adminDelete)

module.exports = router