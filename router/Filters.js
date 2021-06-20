const Router = require('express')
const router = new Router()

const FiltersController = require('../controller/FiltersController')

router.get('/filter-size', FiltersController.getFilterSize)
router.get('/filter-brand', FiltersController.getFilterBrand)

module.exports = router