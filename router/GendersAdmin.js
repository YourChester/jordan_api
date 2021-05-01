const Router = require('express')
const router = new Router()

const GenderController = require('../controller/GenderController')

router.get('/', GenderController.adminIndex)
router.post('/', GenderController.adminCreate)
router.get('/:id', GenderController.adminShow)
router.put('/:id', GenderController.adminUpdate)
router.delete('/:id', GenderController.adminDelete)

module.exports = router