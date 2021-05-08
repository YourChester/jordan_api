const CategoryModel = require('../../model/CategoryModel')
const formatedData = require('./Categories')

async function createGenders() {
  try {
    const parentElement = []
    for (const el in formatedData) {
      if (formatedData[el].parent) {
        const newElement = new CategoryModel({
          name: formatedData[el].name,
          parent: parentElement[formatedData[el].parent - 1]
        })
        const result = await newElement.save()
        console.info(result);
      } else {
        console.log(el);
        const newElement = new CategoryModel({
          name: formatedData[el].name,
        })
        const result = await newElement.save()
        parentElement.push(result._id)
        console.info(result);
      }
    }
  } catch(e) {
    console.log(e);
  }
}

module.exports = createGenders