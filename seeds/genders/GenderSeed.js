const GenderModel = require('../../model/GenderModel')
const formatedData = require('./Categories')

async function createGenders() {
  try {
    for (const el in formatedData) {
      const newElement = new GenderModel({
        name: formatedData[el]
      })
      const result = await newElement.save()
      console.info(result);
    }
    console.log('Заполнение GebdersModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createGenders