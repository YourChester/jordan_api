const Router = require('express')
const router = new Router()

const costsAdmin = require('./CostsAdmin')
const statisticAdmin = require('./StatisticAdmin')

const productsUser = require('./ProductsUser')
const productsAdmin = require('./ProductsAdmin')

const gendersUser = require('./GendersUser')
const gendersAdmin = require('./GendersAdmin')

const discountCardsAdmin = require('./DiscountCardsAdmin')

const categoryiesAdmin = require('./CategoryiesAdmin')

const rolesAdmin = require('./RolesAdmin')

const authSellerAdmin = require('./AuthSellerAdmin')
const sellersAdmin = require('./SellersAdmin')

const usersUser = require('./UsersUser')
const usersAdmin = require('./UsersAdmin')

const soldsAdmin = require('./SoldAdmin')

const codebooks = require('./Codebooks')
const filters = require('./Filters')
const file = require('./File')

router.use('/products', productsUser)
router.use('/admin/products', productsAdmin)
router.use('/admin/file', file)
router.use('/admin/solds', soldsAdmin)
router.use('/admin/costs', costsAdmin)
router.use('/admin/statistic', statisticAdmin)


router.use('/genders', gendersUser)
router.use('/admin/genders', gendersAdmin)

router.use('/admin/discount-cards', discountCardsAdmin)

router.use('/admin/categoryies', categoryiesAdmin)

router.use('/admin/roles', rolesAdmin)

router.use('/admin/auth', authSellerAdmin)
router.use('/admin/sellers', sellersAdmin)

router.use('/users', usersUser)
router.use('/admin/users', usersAdmin)

router.use('/codebooks', codebooks)
router.use('/filters', filters)

module.exports = router