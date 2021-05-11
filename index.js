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

// Создание приложения
const app = express()

// Подключение расширений
app.use(cors({origin: process.env.FRONT_URL}))
app.use(express.json())
app.use('/api/static/', express.static(path.resolve(__dirname, 'static')))
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
  () => {
    const isNeedSeeds = process.argv[2]

    app.listen(process.env.API_PORT)
    
    if (isNeedSeeds === 'true') {
      mongoDB.connection.db.dropCollection('categorymodels')
      mongoDB.connection.db.dropCollection('gendermodels')
      createCategory()
      createGenders()
    }

    console.log('----------');
    console.log('\x1b[32m');
    console.log('Server starting');
    console.log(`http://localhost:${process.env.API_PORT}/`);
    console.log('\x1b[37m');
    console.log('----------');
  }
)
