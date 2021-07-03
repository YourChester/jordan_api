const SoldModel = require('../model/SoldModel')
const ProductModel = require('../model/ProductModel')

class SoldController {
  async adminIndex(req, res) {
    try {
      const page = req.query.page
      const limit = Number(req.query.limit) || 40
      const offSet = limit * page - limit

      const payload = {}
      
      if (req.query.seller) {
        payload.seller = { $in: [req.query.seller] }
      }

      const solds = await SoldModel.find({...payload})
        .sort({ date: 1 })
        .populate('seller')
        .populate('card')
        .populate('products')
        .skip(offSet)
        .limit(limit)

      const totalElement = await SoldModel.countDocuments()
    
      return res.status(200).json({ 
        solds,
        totalCount: totalElement,
        totalPages: Math.ceil(totalElement / limit)
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const sold = req.body
      const products = sold.products

      for(let i = 0; i < products.length; i++) {
        const product = sold.products[i]
        await ProductModel.updateOne(
          { _id: product._id }, 
          { $set: { dateOut: product.dateOut, priseSold: product.priseSold, visibility:  product.visibility } }
        )
      }

      sold.products = sold.products.map(product => product._id)

      const newSold = new SoldModel(sold)
      await newSold.save()
      if (newSold !== null) {
        return res.status(200).json({sold: newSold})
      } else {
        return res.status(500).json({ message: 'Не удалось создать продажу'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const sold = await SoldModel.findById(id)
        .populate('card')
        .populate('products')
        
      if (sold !== null) {
        return res.status(200).json({ sold })
      } else {
        return res.status(500).json({ message: 'Категория не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const sold = req.body

      const updatedSold= await SoldModel.updateOne({ _id: id }, { $set: sold })
      if (updatedSold.nModified) {
        const sold = await SoldModel.findById(id)
        return res.status(200).json(sold)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить продажу'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const sold = await SoldModel.findById(id)

      for(let i = 0; i < sold.products.length; i++) {
        const product = sold.products[i]
        await ProductModel.updateOne(
          { _id: product._id }, 
          { $set: { dateOut: null, priseSold: 0, visibility: true } }
        )
      }

      const deletedSold = await SoldModel.deleteOne({ _id: id })
      if (deletedSold.deletedCount) {
        return res.status(200).json({ message: 'Продажа удалена'})
      } else {
        return res.status(500).json({ message: 'Не удалось удалить продажу'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new SoldController()