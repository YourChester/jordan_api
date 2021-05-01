const Router = require('express')
const router = new Router()

const CategoryController = require('../controller/CategoryController')

router.get('/', CategoryController.index)

module.exports = router