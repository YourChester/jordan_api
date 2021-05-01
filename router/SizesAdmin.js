const Router = require('express')
const router = new Router()

const SizeController = require('../controller/SizeController')

router.get('/', SizeController.adminIndex)
router.post('/', SizeController.adminCreate)
router.get('/:id', SizeController.adminShow)
router.put('/:id', SizeController.adminUpdate)
router.delete('/:id', SizeController.adminDelete)

module.exports = router