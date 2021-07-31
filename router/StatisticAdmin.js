const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const StatisticController = require('../controller/StatisticController')
// roleMiddleware(['admin']),

router.get('/', StatisticController.getStatistic)
router.get('/month', StatisticController.getStatisticMonth)

module.exports = router