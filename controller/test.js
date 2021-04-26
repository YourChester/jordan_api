const path = require('path')
const fs = require('fs')

const Test = require('../model/test')

const getCurentIndex = (articul, index, curentImages) => {
  if (!curentImages.find(el => el.includes(`${articul}_${index}`))) {
    return index
  } else {
    return getCurentIndex(articul, index + 1, curentImages)
  }
}

class TestController {
  async getFiles(req, res) {
    try {
      // const tests = await Test.aggregate([ { $match: { show: true } }, { $group: { _id: "$articul", name: { $push: "$$ROOT" } } }])
      const tests = await Test.find()
      return res.status(200).json({ tests })
    } catch (e) {
      console.log(e);
    }
  }

  async addFile(req, res) {
    try {
      const { articul } = req.body

      const { images } = req.files

      if (images?.length) {
        images.forEach((image, index) => {
          const imageName = `${articul}_${index}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
        })
      }

      const newTest = new Test({ articul })
      await newTest.save()

      return res.status(200).json({ newTest })
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFile(req, res) {
    try {
      const test = req.body

      const deleteImages = req.body.deleteImages
      const { images } = req.files || {}

      if (deleteImages?.length) {
        const existFile = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(test.articul))
        deleteImages.forEach((deleteImage) => {
          if (deleteImage && existFile.includes(deleteImage)) {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', deleteImage))
          }
        })
      }

      if (images?.length) {
        images.forEach((image) => {
          const curentImages = fs.readdirSync(path.resolve(__dirname, '..', 'static')).filter(el => el.includes(test.articul))
          const curentIndex = getCurentIndex(test.articul, 0, curentImages)
          const imageName = `${test.articul}_${curentIndex}.jpg`
          image.mv(path.resolve(__dirname, '..', 'static', imageName))
        })
      }
      
      await Test.updateOne({ _id: req.params.id }, { $set: test })

      const newTest = await Test.findById(req.params.id)
      return res.status(200).json({ test: newTest })
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Не удалось" })
    }
  }
}

module.exports = new TestController()