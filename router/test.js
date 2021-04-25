const Router = require('express')
const router = new Router()

const TestController = require('../controller/test.js')

// router.get('/', TestController.getUserList)
router.get('/', TestController.getFiles)
router.post('/', TestController.addFile)
router.put('/:id', TestController.deleteFile)

module.exports = router