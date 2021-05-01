const DiscountCardModel = require('../model/DiscountCardModel')

class DiscountCardController {
  async adminIndex(req, res) {
    try {
      const discountCards = await DiscountCardModel.find()
      return res.status(200).json({ discountCards })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const {
        firstName,
        lastName,
        middleName,
        phone,
        birthday,
        discount,
        comment,
        visibility 
      } = req.body
      const newDiscountCard = new DiscountCardModel({firstName, lastName, middleName, phone, birthday, discount, comment, visibility})
      await newDiscountCard.save()
      if (newDiscountCard !== null) {
        return res.status(200).json(newDiscountCard)
      } else {
        return res.status(500).json({ message: 'Не удалось создать скидочную карту'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const discountCard = DiscountCardModel.findById(id)
      if (discountCard !== null) {
        return res.status(200).json(discountCard)
      } else {
        return res.status(500).json({ message: 'Скидочная карта не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const {
        firstName,
        lastName,
        middleName,
        phone,
        birthday,
        discount,
        comment,
        visibility 
      } = req.body
      const updatedDiscountCard = await DiscountCardModel.updateOne(
        { _id: id }, { $set: {firstName, lastName, middleName, phone, birthday, discount, comment, visibility} }
      )
      if (updatedDiscountCard.nModified) {
        const discountCard = await DiscountCardModel.findById(id)
        return res.status(200).json(discountCard)
      } else {
        return res.status(500).json({ message: 'Не обновить скидочную карту'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedDiscountCard = await DiscountCardModel.remove({ _id: id })
      if (deletedDiscountCard.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить скидочную карту'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new DiscountCardController()