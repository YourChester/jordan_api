const path = require('path')
const fs = require('fs')
const { ObjectId } = require('mongodb')

const ProductModel = require('../model/ProductModel')
const CategoryModel = require('../model/CategoryModel')

const getCurrentIndex = (articul, index, curentImages) => {
  if (!curentImages.find(el => el.includes(`${articul}_${index}`))) {
    return index
  } else {
    return getCurrentIndex(articul, index + 1, curentImages)
  }
}

class ProductController {
  async index(req, res) {
    try {
      const page = req.query.page
      const limit = Number(req.query.limit) || 12
      const offSet = limit * page - limit
      const payload = {
        visibility: true
      }

      if (req.query.gender && req.query.gender !== 'all') {
        payload.gender = ObjectId(req.query.gender)
      }
      if (req.query.category) {
        const category = await CategoryModel.findById(req.query.category)
        if (!category.parent) {
          const categorys = await CategoryModel.find({ parent: ObjectId(category._id) })
          payload.category = { $in: [] }
          categorys.forEach(el => {
            payload.category.$in.push(ObjectId(el._id))
          })
        } else {
          payload.category = ObjectId(category._id)
        }
      }
      if (req.query.size) {
        payload.size = { $in: req.query.size }
      }

      const products = await ProductModel.aggregate([
        { $match: { ...payload } },
        { $group: { _id: "$articul", name: { $first: "$name" }, dateIn: { $first: "$dateIn"}, products: { $push: "$$ROOT" } } },
        { $sort: { name: 1 } }
      ]).skip(offSet).limit(limit)

      const totalProducts = await ProductModel.countDocuments({...payload})

      const productWithImage = products.map(product => {
        const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product._id))
        return {
          ...product,
          images: images
        }
      })
      return res.status(200).json({ 
        products: productWithImage,
        totalCount: totalProducts,
        totalPages: Math.ceil(totalProducts / limit)
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminIndex(req, res) {
    try {
      const page = req.query.page
      const limit = Number(req.query.limit) || 40
      const offSet = limit * page - limit
      const payload = {
      }

      if (req.query.visibility) {
        payload.visibility = req.query.visibility
      }
      if (req.query.search) {
        payload.$or = [
          { codeProduct:  new RegExp(req.query.search, 'i')},
          { codeBox:  new RegExp(req.query.search, 'i')},
          { articul:  new RegExp(req.query.search, 'i')}
        ]
      }

      const products = await ProductModel.find({...payload})
        .populate('category')
        .populate('pair')
        .populate('seller')
        .sort({'dateIn': -1})
        .skip(offSet)
        .limit(limit)

      const totalProducts = await ProductModel.countDocuments({...payload})
      
      const productWithImage = products.map((product) => {
        if (product.articul) {
          const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
          return {
            ...product._doc,
            images: images
          }
        } else {
          return {
            ...product._doc,
            images: []
          }
        }
      })

      return res.status(200).json({ 
        products: productWithImage,
        totalCount: totalProducts,
        totalPages: Math.ceil(totalProducts / limit)
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminSearchByArticul(req, res) {
    try {
      const payload = {}
      const id = req.params.id
      
      payload.articul = new RegExp(id, 'i')

      const product = await ProductModel.findOne({...payload})
      
      let productWithImage = {}
      
      if (product.articul) {
        const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
        productWithImage = {
          ...product._doc,
          images: images
        }
      }

      return res.status(200).json({ product: productWithImage })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    } 
  }

  async adminCreate(req, res) {
    try {
      const body = req.body

      if (!body.pair) {
        delete body.pair
      }

      const newProduct = new ProductModel(body)
      await newProduct.save()
      if (newProduct !== null) {
        return res.status(200).json(newProduct)
      } else {
        return res.status(500).json({ message: 'Не удалось создать товар'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)
        .populate('gender')
        .populate('category')
        .populate('pair')
        .populate('seller')

      const productSizes = await ProductModel.aggregate([
          { $match: { articul: product.articul, visibility: true } },
          { $group: { _id: "$size" } },
        ])
      const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
      if (product !== null) {
        return res.status(200).json({ product: { ...product._doc, images: curentImages, size: productSizes.map((el) => el._id) } })
      } else {
        return res.status(500).json({ message: 'Товар не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)

      const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
      if (product !== null) {
        return res.status(200).json({ product: { ...product._doc, images: curentImages } })
      } else {
        return res.status(500).json({ message: 'Товар не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      let fileChange = false
      const id = req.params.id
      const updateProduct = req.body

      const updatedProduct = await ProductModel.updateOne(
        { _id: id }, 
        { $set: updateProduct }
      )
      if (updatedProduct.nModified || fileChange) {
        const product = await ProductModel.findById(id)
          .populate('gender')
          .populate('category')
          .populate('pair')
          .populate('seller')
        return res.status(200).json(product)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить товар'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const product = await ProductModel.findById(id)
      if (product) {
        const products = await ProductModel.find({ articul: product.articul, visibility: true })
  
        if (products.length === 1) {
          const existFile = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
          existFile.forEach((file) => {
            if (file) {
              fs.unlinkSync(path.resolve(__dirname, '..', 'static', file))
            }
          })
        }
  
        const deletedProduct = await ProductModel.remove({ _id: id })
  
        if (deletedProduct.deletedCount !== 0) {
          return res.status(200).json({ message: 'Товар удален'})
        } else {
          return res.status(500).json({ message: 'Не удалось удалить товар'})
        }
      } else {
        return res.status(500).json({ message: 'Товар не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new ProductController()