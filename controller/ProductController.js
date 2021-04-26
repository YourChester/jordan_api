const path = require('path')
const fs = require('fs')

const ProductModel = require('../model/ProductModel')

const getCurentIndex = (articul, index, curentImages) => {
  if (!curentImages.find(el => el.includes(`${articul}_${index}`))) {
    return index
  } else {
    return getCurentIndex(articul, index + 1, curentImages)
  }
}

class ProductController {
  async index(req, res) {
    try {
      const products = await ProductModel.aggregate([
        { $match: { show: true } },
        { $group: { _id: "$articul", name: { $push: "$$ROOT" } } }
      ])
      const images = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
      const productWithImage = products.map(product => {
        const curentImages = images.filter(image => image.includes(product._id))
        product = {
          ...product,
          images: curentImages
        }
      })
      return res.status(200).json({ products: productWithImage })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminIndex(req, res) {
    try {
      const products = await ProductModel.find()
        .populate('gender')
        .populate('size')
        .populate('brand')
        .populate('pair')
        .populate('seller')

      return res.status(200).json({ products })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async create(req, res) {
    try {
      const {
        name,
        gender,
        size,
        brand,
        codeBox,
        codeProduct,
        articul,
        pair,
        priceIn,
        priceOut,
        priseSold,
        discount,
        canUseDiscount,
        seller,
        comment,
        dateIn,
        dateOut,
        visibility
      } = req.body

      const { images } = req.files || {}

      if (images?.length) {
        images.forEach((image, index) => {
          const imageName = `${articul}_${index}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
        })
      }

      const newProduct = new ProductModel({
        name,
        gender,
        size,
        brand,
        codeBox,
        codeProduct,
        articul,
        pair,
        priceIn,
        priceOut,
        priseSold,
        discount,
        canUseDiscount,
        seller,
        comment,
        dateIn,
        dateOut,
        visibility 
      })
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
        .populate('size')
        .populate('brand')
        .populate('pair')
        .populate('seller')
      const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
      if (product !== null) {
        return res.status(200).json({ product: { ...product, images: curentImages } })
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
      delete updateProduct.deleteImages

      const deleteImages = req.body.deleteImages
      const { images } = req.files || {}

      if (deleteImages?.length) {
        const existFile = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(test.articul))
        deleteImages.forEach((deleteImage) => {
          if (deleteImage && existFile.includes(deleteImage)) {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImage))
          }
        })
        fileChange = true
      }

      if (images?.length) {
        images.forEach((image) => {
          const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(test.articul))
          const curentIndex = getCurentIndex(test.articul, 0, curentImages)
          const imageName = `${test.articul}_${curentIndex}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
        })
        fileChange = true
      }

      const updatedProduct = await ProductModel.updateOne(
        { _id: id }, 
        { $set: updateProduct }
      )
      if (updatedProduct.nModified || fileChange) {
        const product = await ProductModel.findById(id)
          .populate('gender')
          .populate('size')
          .populate('brand')
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

      const existFile = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(product.articul))
      existFile.forEach((file) => {
        if (file) {
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', file))
        }
      })

      const deletedProduct = await ProductModel.remove({ _id: id })

      if (deletedProduct.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить товар'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new ProductController()