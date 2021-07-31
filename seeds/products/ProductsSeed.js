const ProductModel = require('../../model/ProductModel')
const GenderModel = require('../../model/GenderModel')
const CategoryModel = require('../../model/CategoryModel')
const SellerModel = require('../../model/SellerModel')
const DiscountCardModel = require('../../model/DiscountCardModel')
const SoldModel = require('../../model/SoldModel')

const categoriesHelper = require('../categories/Categories')
const gendersHelper = [
  {
    id: 1,
    name: ['Мужчины']
  },
  {
    id: 3,
    name: ['Мужчины', 'Женщины']
  },
  {
    id: 2,
    name: ['Женщины']
  },
  {
    id: 5,
    name: ['Мужчины', 'Дети']
  },
  {
    id: 6,
    name: ['Женщины', 'Дети']
  },
  {
    id: 4,
    name: ['Дети']
  },
  {
    id: 0,
    name: 'Пусто'
  },
  {
    id: 7,
    name: ['Мужчины', 'Женщины', 'Дети']
  }
]
const formatedData = require('./Products')

function getCurrentCategory(id, categories) {
  if (id) {
    if (id == 61) {
      const currentCategory = categoriesHelper.find(el => el.id === 3)
      return categories.find(el => el.name === currentCategory.name)._id
    } else {
      const currentCategory = categoriesHelper.find(el => el.id === id)
      return categories.find(el => el.name === currentCategory.name)._id
    }
  } else {
    return categories[0]._id
  }
}

function getCurrentGender(id, genders) {
  if (id > 0) {
    const currentGenders = gendersHelper.find(el => el.id === id)
    if (currentGenders) {
      const currentGendersIds = []
      currentGenders.name.forEach(el => {
        const id = genders.find(gender => gender.name === el)._id
        if (id) {
          currentGendersIds.push(id)
        }
      })
      return currentGendersIds
    }
  }
}

function getDiscountCard(code, discoundCards) {
  if (code) {
    return discoundCards.find(el => el.code === code)
  } else {
    return null
  }
}

function getSellers(ids, sellers) {
  if (ids.length) {
    let sellersDate = []
    ids.forEach(sellerId => {
      const seller = sellers.find(sellers => sellers.oldId === Number(sellerId))
      if (seller) {
        sellersDate.push(seller._id)
      }
    })
    return sellersDate
  }
}

async function createProducts() {
  try {
    const genders = await GenderModel.find()
    const categories = await CategoryModel.find()
    const sellers = await SellerModel.find()
    const discoundCards = await DiscountCardModel.find()

    for (const index in formatedData) {
      const currentCategory = getCurrentCategory(formatedData[index].category, categories)
      const currentGender = getCurrentGender(formatedData[index].gender, genders)

      const newElement = new ProductModel({
        name: formatedData[index].name,
        gender: currentGender,
        category: currentCategory,
        size: formatedData[index].size,
        brand: formatedData[index].brand,
        provider: '',
        codeBox: formatedData[index].codeBox,
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
        pair: formatedData[index].pair,
        notPair: !!formatedData[index].notPair
      })

      const products = await newElement.save()

      if (formatedData[index].status === 'sold') {
        const discountCards = formatedData[index].soldCard ? getDiscountCard(formatedData[index].soldCard, discoundCards) : null

        const newSold = new SoldModel({
          seller: getSellers(formatedData[index].sellerId, sellers),
          card: discountCards ? discountCards._id : null,
          discount: discountCards ? discountCards.discount : 0,
          date: formatedData[index].dateOut,
          totalPrice: formatedData[index].priceSold,
          totalIncome: formatedData[index].priceSold - formatedData[index].priceIn,
          products: [products._id]
        })
        await newSold.save()
      }

      console.log(formatedData[index].id)
    }
    console.log('Заполнение ProductModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createProducts  