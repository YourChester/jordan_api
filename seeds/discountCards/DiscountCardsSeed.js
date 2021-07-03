const DiscountCardModel = require('../../model/DiscountCardModel')
const formatedData = require('./DiscountCards')

async function createDiscountCards() {
  try {
    for (const el in formatedData) {
      const newElement = new DiscountCardModel({
        code: formatedData[el].code,
        name: formatedData[el].name,
        phone: formatedData[el].phone,
        email: formatedData[el].email,
        address: formatedData[el].address,
        birthday: formatedData[el].birthday,
        createAt: new Date(formatedData[el].createAt.split(' ').join('T')),
        discount: formatedData[el].discount,
        comment: formatedData[el].comment,
        visibility: !!formatedData[el].visibility,
      })
      await newElement.save()
    }
    console.log('Заполнение DiscountCardModel завершено');
  } catch(e) {
    console.log(e);
  }
}

module.exports = createDiscountCards