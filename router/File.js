const Router = require('express')
const router = new Router()

const FileController = require('../controller/FileController')

router.put('/:id', FileController.adminCreate)
router.delete('/:id', FileController.adminDelete)

module.exports = router