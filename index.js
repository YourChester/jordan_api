const path = require('path')
const express = require('express')
const expressFileupload = require('express-fileupload')
const mongoDB = require('mongoose')
const cors = require('cors')
const router = require('./router/index.js')
const ErrorMiddleware = require('./middleware/errorMiddleware.js')
require('dotenv/config')

const createCategory = require('./seeds/categories/CategoriesSeed')
const createGenders = require('./seeds/genders/GenderSeed')
const createProducts = require('./seeds/products/ProductsSeed')
const createSeller = require('./seeds/seller/SellersSeed')
const createRoles = require('./seeds/roles/RolesSeed')
const createDiscountCards = require('./seeds/discountCards/DiscountCardsSeed')
const CodebooksController = require('./controller/CodebooksController')

// Создание приложения
const app = express()

// Подключение расширений
app.use(cors({origin: process.env.FRONT_URL}))
app.use(express.json())
app.use('/api/static/', express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, "./dist")));
app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./dist/index.html"));
});
app.get("/favicon.ico", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./dist/favicon.ico"));
});
app.use(expressFileupload({}))



// Использование роутов
app.use('/api/', router)

// Обработка описанных ошибок
app.use(ErrorMiddleware)


mongoDB.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  async () => {
    // const isNeedSeeds = process.argv[2] === '--seed'
    
    app.listen(process.env.API_PORT)
    
    // if (isNeedSeeds) {
    mongoDB.connection.db.dropCollection('categorymodels')
    mongoDB.connection.db.dropCollection('gendermodels')
    mongoDB.connection.db.dropCollection('productmodels')
    mongoDB.connection.db.dropCollection('discountcardmodels')
    mongoDB.connection.db.dropCollection('rolemodels')
    mongoDB.connection.db.dropCollection('sellermodels')
    await createCategory()
    await createGenders()
    await createProducts()
    await createDiscountCards()
    await createRoles()
    await createSeller()
    // }

    CodebooksController.buildMenu()

    setInterval(()=>{
      CodebooksController.buildMenu()
    }, 1000 * 60 * 24)

    console.log('----------');
    console.log('\x1b[32m');
    console.log('Server starting');
    console.log(`http://localhost:${process.env.API_PORT}/`);
    console.log('\x1b[37m');
    console.log('----------');
  }
)
