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
      const sort = {}

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
      if (req.query.brand) {
        payload.brand = { $in: req.query.brand }
      }
      switch (req.query.sort) {
        case 'dicount':
          sort.discount = -1
          break;
        case 'prise-reverse':
          sort.priceOut = -1
          break;
        case 'prise':
          sort.priceOut = 1
          break;
        case 'name-reverse':
          sort.name = -1
          break;
        case 'name':
          sort.name = 1
          break;
        default:
          sort.dateIn = -1
          break;
      }
  

      const products = await ProductModel.aggregate([
        { $match: { ...payload } },
        { $group: { 
            _id: "$articul",
            name: { $first: "$name" },
            dateIn: { $first: "$dateIn"},
            priceOut: { $first: "$priceOut" },
            discount: { $first: "$discount" },
            products: { $push: "$$ROOT" }
          } 
        },
        { $sort: { ...sort } }
      ]).skip(offSet).limit(limit)

      const totalProducts = await ProductModel.aggregate([
        { $match: { ...payload } },
        { $group: { 
            _id: "$articul",
            name: { $first: "$name" },
            dateIn: { $first: "$dateIn"},
            priceOut: { $first: "$priceOut" },
            discount: { $first: "$discount" },
            products: { $push: "$$ROOT" } 
          } 
        },
        { $sort: { ...sort } }
      ])

      const productWithImage = products.map(product => {
        const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0] === product._id)
        return {
          ...product,
          images: images
        }
      })
      return res.status(200).json({ 
        products: productWithImage,
        totalCount: totalProducts.length,
        totalPages: Math.ceil(totalProducts.length / limit)
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
      if (req.query.name) {
        payload.name = new RegExp(req.query.name, 'i')
      }
      if (req.query.provider) {
        payload.provider = new RegExp(req.query.provider, 'i')
      }
      if (req.query.brand) {
        payload.brand = new RegExp(req.query.brand, 'i')
      }
      if (req.query.category) {
        payload.category = { $in: [req.query.category] }
      }

      const products = await ProductModel.find({...payload})
        .populate('category')
        .populate('seller')
        .sort({'dateIn': -1})
        .skip(offSet)
        .limit(limit)


        // "$priceOut" - ("$priceOut" / 100) * "$discount"
      const totalMoney = await ProductModel.aggregate([
        {
          $project: {
            visibility: 1,
            priceIn: 1,
            priceOut: 1,
            discount: { 
              $cond: [
                "$discount",
                {
                  $subtract: [
                    "$priceOut", 
                    { 
                      $multiply: [
                        { 
                          $divide: [ 
                            "$priceOut",
                            100 
                          ] 
                        }, 
                        "$discount"
                      ] 
                    }
                  ],
                },
                "$priceOut" 
              ]
            }
          }
        },
        {
          $group: {
            _id: "$visibility",
            totalPriceIn: { $sum: "$priceIn"},
            totalPriceOut: { $sum: "$discount" }
          }
        }
      ])

      const totalProducts = await ProductModel.countDocuments({...payload})
      
      const productWithImage = products.map((product) => {
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

      return res.status(200).json({ 
        products: productWithImage,
        totalCount: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        totalMoney,
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
      if (product) {
        if (product.articul) {
          const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.articul))
          productWithImage = {
            ...product._doc,
            images: images
          }
        }
      } else {
        return res.status(200).json({ product: null })
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
        .populate('seller')

      let pairProduct = null
      if (product.pair) {
        const payload = {
          visibility: true,
          articul: new RegExp(product.pair, 'i')
        }
        const pairs = await ProductModel.find({...payload})
          .populate('gender')
          .populate('category')
          .populate('seller')

        const curentPairImages = pairs.length ? fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.pair)) : []
        pairProduct = pairs.length ? { pairs, images: curentPairImages} : ''
      }

      const productSizes = await ProductModel.aggregate([
          { $match: { articul: product.articul, visibility: true } },
          { $group: { _id: "$size" } },
        ])
      const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
      if (product !== null) {
        return res.status(200).json({ product: { ...product._doc, images: curentImages, size: productSizes.map((el) => el._id), pairProduct } })
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
      let pairImages = []
      if (product.pair) {
        pairImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.split('_')[0].includes(product.pair))
      }
      if (product !== null) {
        return res.status(200).json({ product: { ...product._doc, images: curentImages, pairImages } })
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
      const id = req.params.id
      const updateProduct = req.body

      const product = await ProductModel.findById(id)

      const updatedProduct = await ProductModel.updateOne(
        { _id: id }, 
        { $set: updateProduct }
      )

      const updatedBody = {}

      if (product.visibility && updateProduct.articul) {
        if (product.pair !== updateProduct.pair) {
          updatedBody.pair = updateProduct.pair
        }
        if (product.discount !== updateProduct.discount) {
          updatedBody.discount = updateProduct.discount
        }
        if (product.name !== updateProduct.name) {
          updatedBody.name = updateProduct.name
        }
        if (product.brand !== updateProduct.brand) {
          updatedBody.brand = updateProduct.brand
        }
        const keys = Object.keys(updatedBody)
        if (keys.length) {
          const productController = new ProductController()
          productController.adminUpdateByArticul(updatedBody, updateProduct.articul)
        }
      }

      if (updatedProduct.nModified) {
        const product = await ProductModel.findById(id)
        return res.status(200).json({ product })
      } else {
        return res.status(500).json({ message: 'Товар не был изменен'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdateByArticul(updatedBody, articul) {
    try {
      const payload = {}
      payload.articul = new RegExp(articul, 'i')
      payload.visibility = true
      const products = await ProductModel.find({...payload})
      const idsProduct = []

      products.forEach(el => {
        idsProduct.push(el._id)
      })

      await ProductModel.updateMany(
        { _id: idsProduct }, 
        { $set: updatedBody }
      )
    } catch(e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdateMany(req, res) {
    try {
      const ids = req.body.ids
      const body = {}
      if (req.body.priceIn) {
        body.priceIn = req.body.priceIn
      }
      if (req.body.discount) {
        body.discount = req.body.discount
      }

      const updatedProduct = await ProductModel.updateMany(
        { _id: ids }, 
        { $set: body }
      )
      if (updatedProduct.nModified) {
        return res.status(200).json({ updated: updatedProduct.nModified })
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