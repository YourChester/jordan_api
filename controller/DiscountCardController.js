const DiscountCardModel = require('../model/DiscountCardModel')
const SoldModel = require('../model/SoldModel')

class DiscountCardController {
  async adminIndex(req, res) {
    try {
      const page = req.query.page || 1
      const limit = Number(req.query.limit) || 40
      const offSet = limit * page - limit

      const payload = {

      }

      if (req.query.code) {
        payload.code = req.query.code
      }
      if (req.query.name) {
        payload.name = new RegExp(req.query.name, 'i')
      }
      if (req.query.phone) {
        payload.phone = new RegExp(req.query.phone, 'i')
      }

      const discountCards = await DiscountCardModel.find({...payload})
        .sort({ 'code': -1 })
        .skip(offSet)
        .limit(limit)

      const totalElement = await DiscountCardModel.countDocuments({...payload})
    
      return res.status(200).json({ 
        discountCards,
        totalCount: totalElement,
        totalPages: Math.ceil(totalElement / limit)
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminGenerateNewCode(req, res) {
    try {
      const discountCard = await DiscountCardModel.findOne()
        .sort({ 'code': -1 })
    
      return res.status(200).json({ 
        code: discountCard.code + 1
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const body = req.body
      const newDiscountCard = new DiscountCardModel(body)
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
      const discountCard = await DiscountCardModel.findById(id)
      const solds = await SoldModel.find({ card: id }).populate('products')
      let products = []
      solds.forEach(el => products = [ ...el.products, ...products ])

      if (discountCard !== null) {
        return res.status(200).json({ ...discountCard._doc, history: products })
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
      const body = req.body
      const updatedDiscountCard = await DiscountCardModel.updateOne(
        { _id: id }, { $set: body }
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
      const deletedDiscountCard = await DiscountCardModel.deleteOne({ _id: id })
      if (deletedDiscountCard.deletedCount) {
        return res.status(200).json({ message: 'Скидочную карту удалена'})
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