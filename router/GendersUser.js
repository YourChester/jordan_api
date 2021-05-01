const Router = require('express')
const router = new Router()

const GenderController = require('../controller/GenderController')

router.get('/', GenderController.index)
router.get('/:id', GenderController.show)

module.exports = router