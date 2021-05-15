const GenderModel = require('../../model/GenderModel')
const formatedData = require('./Genders')

async function createGenders() {
  try {
    for (const el in formatedData) {
      const newElement = new GenderModel({
        name: formatedData[el]
      })
      await newElement.save()
    }
    console.log('Заполнение GebdersModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createGenders