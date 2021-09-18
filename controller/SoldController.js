const path = require('path')
const fs = require('fs')
const { ObjectId } = require('mongodb')

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
        payload.seller = { $in: [ObjectId(req.query.seller)] }
      }
      if (req.query.search) {
        payload.$or = [
          { 'products_info.codeProduct':  new RegExp(req.query.search, 'i')},
          { 'products_info.codeBox':  new RegExp(req.query.search, 'i')},
          { 'products_info.articul':  new RegExp(req.query.search, 'i')},
          { 'products_info.name':  new RegExp(req.query.search, 'i')}
        ]
      }

      const solds = await SoldModel.aggregate([
          {
            $lookup:
              {
                from: "sellermodels",
                localField: "seller",
                foreignField: "_id",
                as: "seller_info"
              }
          },
          {
            $lookup:
              {
                from: "discountcardmodels",
                localField: "card",
                foreignField: "_id",
                as: "card_info"
              }
          },
          {
            $lookup:
              {
                from: "productmodels",
                localField: "products",
                foreignField: "_id",
                as: "products_info"
              }
          },
          
          { $match: { ...payload } },
          { $sort: { date: -1 } }
        ]).skip(offSet).limit(limit)
        
      const groupSolds = []
      solds.forEach(sold => {
        const day = new Date(new Date(sold.date).toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getDate()
        const month = new Date(new Date(sold.date).toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getMonth() + 1
        const year = new Date(new Date(sold.date).toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getFullYear()
        const id = `${day > 10 ? day : '0' + day}.${month > 10 ? month : '0' + month}.${year}`
        const productWithImage = sold.products_info.map((product) => {
          if (product.articul) {
            const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
            let pairImages = []
            if (product.pair) {
              pairImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.pair))
            }
            return {
              ...product,
              images: images,
              pairImages,
            }
          } else {
            return {
              ...product._doc,
              images: []
            }
          }
        })
        const index = groupSolds.findIndex(el => el._id === id)
        if(index > -1) {
          groupSolds[index].solds.push({
            ...sold,
            products_info: productWithImage
          })
          groupSolds[index].totalPrice += Number(sold.totalPrice)
        } else {
          groupSolds.push({
            _id: id,
            totalPrice: Number(sold.totalPrice),
            solds: [{
              ...sold,
              products_info: productWithImage
            }]
          })
        }
      })

      const totalElement = await SoldModel.countDocuments({...payload})
    
      return res.status(200).json({ 
        solds: groupSolds,
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
      const sold = await SoldModel.findById(id).populate('card').populate('products')

      const productWithImage = sold.products.map((product) => {
        if (product.articul) {
          const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
          let pairImages = []
          if (product.pair) {
            pairImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.pair))
          }
          return {
            ...product._doc,
            images: images,
            pairImages,
          }
        } else {
          return {
            ...product._doc,
            images: []
          }
        }
      })

      if (sold !== null) {
        return res.status(200).json({ sold: {
          ...sold._doc,
          products: productWithImage
        }})
      } else {
        return res.status(500).json({ message: 'Продажа не найден'})
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