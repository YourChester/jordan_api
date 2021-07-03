const Router = require('express')
const router = new Router()

const CodebooksController = require('../controller/CodebooksController')

router.get('/menu-tree', CodebooksController.getMenuTree)
router.get('/genders', CodebooksController.getGenders)
router.get('/categories', CodebooksController.getCategories)
router.get('/sizes', CodebooksController.getSizes)
router.get('/sellers', CodebooksController.getSellers)

module.exports = router