const CategoryModel = require('../../model/CategoryModel')
const formatedData = require('./Categories')

async function createCategory() {
  try {
    const parentElement = []
    for (const el in formatedData) {
      if (formatedData[el].parent) {
        const newElement = new CategoryModel({
          name: formatedData[el].name,
          parent: parentElement[formatedData[el].parent - 1]
        })
        await newElement.save()
      } else {
        console.log(el);
        const newElement = new CategoryModel({
          name: formatedData[el].name,
        })
        const result = await newElement.save()
        parentElement.push(result._id)
      }
    }
    console.log('Заполнение CategoryModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createCategory