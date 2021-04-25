const path = require('path')
const uuid = require('uuid')
const ProductModel = require('../model/ProductModel')

class ProductController {
  async index(req, res) {
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
      const { images } = req.files

      const savedImages = []
      if (images?.length) {
        images.forEach(image => {
          const imageName = `${uuid.v4()}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
          savedImages.push(imageName)
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
        images: savedImages,
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
      const product = ProductModel.findById(id)
        .populate('gender')
        .populate('size')
        .populate('brand')
        .populate('pair')
        .populate('seller')
      if (product !== null) {
        return res.status(200).json(product)
      } else {
        return res.status(500).json({ message: 'Товар не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const updateProduct = req.body

      const { images } = req.files

      const savedImages = []
      let oldSavedImages = []
      if (images?.length) {
        images.forEach(image => {
          const imageName = `${uuid.v4()}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
          savedImages.push(imageName)
        })
        
        if (updateProduct.deleteImages) {
          const { images } = await ProductModel.findById(id)
          deleteImages.forEach(deleteImage => {
            const indexFile = images.findIndex(el => el === deleteImage)
            if (indexFile > -1) {
              images.splice(indexFile, 1)
              fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImage))
            }
          })
          oldSavedImages = images
        }

        updateProduct.images = [...savedImages, ...oldSavedImages]
      }

      const updatedProduct = await ProductModel.updateOne(
        { _id: id }, 
        { $set: updateProduct }
      )
      if (updatedProduct.nModified) {
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

  async delete(req, res) {
    try {
      const id = req.params.id
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