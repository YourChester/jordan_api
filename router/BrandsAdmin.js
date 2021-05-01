const Router = require('express')
const router = new Router()

const BrandController = require('../controller/BrandController')

router.get('/', BrandController.adminIndex)
router.post('/', BrandController.adminCreate)
router.get('/:id', BrandController.adminShow)
router.put('/:id', BrandController.adminUpdate)
router.delete('/:id', BrandController.adminDelete)

module.exports = router