const Router = require('express')
const router = new Router()

const SizeController = require('../controller/SizeController')

router.get('/', SizeController.index)

module.exports = router