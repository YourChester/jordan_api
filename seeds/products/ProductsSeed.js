const ProductModel = require('../../model/ProductModel')
const GenderModel = require('../../model/GenderModel')
const CategoryModel = require('../../model/CategoryModel')

const categoriesHelper = require('../categories/Categories')
const gendersHelper = [
  {
    id: 1,
    name: 'Мужчины'
  },
  {
    id: 2,
    name: 'Женщины'
  },
  {
    id: 4,
    name: 'Дети'
  }
]
const formatedData = require('./Products')

function getCurrentCategory(id, categories) {
  if (id) {
    if (id == 61) {
      const currentCategory = categoriesHelper.find(el => el.id === 3)
      return categories.find(el => el.name === currentCategory.name)._id
    } else {
      const currentCategory = categoriesHelper.find(el => el.id === 3)
      return categories.find(el => el.name === currentCategory.name)._id
    }
  } else {
    return categories[0]._id
  }
}

function getCurrentGender(id, genders) {
  const currentGender = gendersHelper.find(el => el.id === id)
  if (currentGender) {
    return genders.find(el => el.name === currentGender.name)._id
  } else {
    return genders[0]._id
  }
}

async function createProducts() {
  try {
    const genders = await GenderModel.find()
    const categories = await CategoryModel.find()

    for (const index in formatedData) {
      const currentCategory = getCurrentCategory(formatedData[index].category, categories)
      const currentGender = getCurrentGender(formatedData[index].gender, genders)

      console.log(formatedData[index].id);
      const newElement = new ProductModel({
        name: formatedData[index].name,
        gender: currentGender,
        category: currentCategory,
        size: formatedData[index].size,
        brand: formatedData[index].brand,
        provider: '',
        codeBox: formatedData[index].codeBox | formatedData[index].codeProduct,
        codeProduct: formatedData[index].codeProduct,
        articul: formatedData[index].articul,
        priceIn: formatedData[index].priceIn,
        priceOut: formatedData[index].priceOut,
        priseSold: formatedData[index].priceSold,
        discount: formatedData[index].discount,
        comment: formatedData[index].comment,
        dateIn: formatedData[index].dateIn,
        dateOut: formatedData[index].dateOut,
        createAt: formatedData[index].createAt,
        visibility: formatedData[index].visibility,
      })
      await newElement.save()
    }
    console.log('Заполнение ProductModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createProducts  