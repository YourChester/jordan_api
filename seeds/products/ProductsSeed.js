const ProductModel = require('../../model/ProductModel')
const formatedData = require('./Categories')

async function createProducts() {
  try {
    for (const el in formatedData) {
      const newElement = new ProductModel({
      })
      const result = await newElement.save()
      console.info(result);
    }
    console.log('Заполнение ProductModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createProducts