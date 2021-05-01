const Router = require('express')
const router = new Router()

const RoleController = require('../controller/RoleController')

router.get('/', RoleController.adminIndex)
router.post('/', RoleController.adminCreate)
router.get('/:id', RoleController.adminShow)
router.put('/:id', RoleController.adminUpdate)
router.delete('/:id', RoleController.adminDelete)

module.exports = router