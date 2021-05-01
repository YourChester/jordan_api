const Router = require('express')
const router = new Router()

const BrandController = require('../controller/BrandController')

router.get('/', BrandController.index)

module.exports = router