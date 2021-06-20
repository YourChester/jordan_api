const Router = require('express')
const router = new Router()

const ProductController = require('../controller/ProductController')

router.get('/', ProductController.adminIndex)
router.post('/', ProductController.adminCreate)
router.get('/:id', ProductController.adminShow)
router.get('/articul/:id', ProductController.adminSearchByArticul)
router.put('/:id', ProductController.adminUpdate)
router.delete('/:id', ProductController.adminDelete)

module.exports = router