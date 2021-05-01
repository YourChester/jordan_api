const Router = require('express')
const router = new Router()

const productsUser = require('./ProductsUser')
const productsAdmin = require('./ProductsAdmin')

const gendersUser = require('./GendersUser')
const gendersAdmin = require('./GendersAdmin')

const discountCardsAdmin = require('./DiscountCardsAdmin')

const categoryiesUser = require('./CategoryiesUser')
const categoryiesAdmin = require('./CategoryiesAdmin')

const brandsUser = require('./BrandsUser')
const brandsAdmin = require('./BrandsAdmin')

const rolesAdmin = require('./RolesAdmin')

const authSellerAdmin = require('./AuthSellerAdmin')
const sellersAdmin = require('./SellersAdmin')

const sizesUser = require('./SizesUser')
const sizesAdmin = require('./SizesAdmin')

const usersUser = require('./UsersUser')
const usersAdmin = require('./UsersAdmin')

router.use('/products', productsUser)
router.use('/admin/products', productsAdmin)

router.use('/genders', gendersUser)
router.use('/admin/genders', gendersAdmin)

router.use('/admin/discountCards', discountCardsAdmin)

router.use('/categoryies', categoryiesUser)
router.use('/admin/categoryies', categoryiesAdmin)

router.use('/brands', brandsUser)
router.use('/admin/brands', brandsAdmin)

router.use('/admin/roles', rolesAdmin)

router.use('/admin/auth', authSellerAdmin)
router.use('/admin/sellers', sellersAdmin)

router.use('/sizes', sizesUser)
router.use('/admin/sizes', sizesAdmin)

router.use('/users', usersUser)
router.use('/admin/users', usersAdmin)

const test = require('./test')
router.use('/test', test)

module.exports = router