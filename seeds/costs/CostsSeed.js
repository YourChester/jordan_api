const CostsModel = require('../../model/CostsModel')

const formatedData = require('./Costs')

async function createCosts() {
  try {
    for (const index in formatedData) {

      const newElement = new CostsModel({
        name: formatedData[index].name,
        sum: formatedData[index].sum,
        date: formatedData[index].date,
        comment: formatedData[index].comment,
      })
      await newElement.save()
    }
    console.log('Заполнение CostsModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createCosts