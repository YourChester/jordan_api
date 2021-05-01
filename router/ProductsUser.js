const Router = require('express')
const router = new Router()

const ProductController = require('../controller/ProductController')

router.get('/', ProductController.index)
router.get('/:id', ProductController.show)

module.exports = router