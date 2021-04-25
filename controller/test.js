const Test = require('../model/test')

class TestController {
  async getFiles(req, res) {
    try {
      // const tests = await Test.aggregate([{ $group: { _id: "$articul", name: {$push: "$$ROOT"} }}]).limit(2)
      // console.log(tests);
      // res.status(200).send(tests)
      // .aggregate([{ $group: { _id: "$articul", name: {$push: "$$ROOT"} }}])
      const tests = await Test.aggregate([ { $match: { show: true } }, { $group: { _id: "$articul", name: { $push: "$$ROOT" } } }])
      return res.status(200).json({ tests })
    } catch (e) {
      console.log(e);
    }
  }

  async addFile(req, res) {
    try {
      const { name, articul, show } = req.body

      const newTest = new Test({ name, articul, show })
      await newTest.save()

      return res.status(200).json({ newTest })
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFile(req, res) {
    try {
      
      const updatedTest = await Test.updateOne({ _id: req.params.id }, { $set: {images: newImages} })
      if (updatedTest.nModified) {
        const test = await Test.findById(req.params.id)
        return res.status(200).json({ test })
      } else {
        return res.status(400).json({ message: "Не удалось" })
      }

    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TestController()