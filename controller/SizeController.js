const SizeModel = require('../model/SizeModel')

class SizeController {
  async index(req, res) {
    try {
      const sizes = await SizeModel.find().populate('gender').populate('category')
      return res.status(200).json({ sizes })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminIndex(req, res) {
    try {
      const sizes = await SizeModel.find().populate('gender').populate('category')
      return res.status(200).json({ sizes })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { name, gender, category } = req.body
      const newSize = new SizeModel({name, gender, category})
      await newSize.save()
      if (newSize !== null) {
        return res.status(200).json(newSize)
      } else {
        return res.status(500).json({ message: 'Не удалось создать размер'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const size = await SizeModel.findById(id).populate('gender').populate('category')
      if (size !== null) {
        return res.status(200).json(size)
      } else {
        return res.status(500).json({ message: 'Размер не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const { name, gender, category } = req.body
      const updatedSize = await SizeModel.updateOne({ _id: id }, { $set: { name, gender, category } })
      if (updatedSize.nModified) {
        const size = await SizeModel.findById(id).populate('gender').populate('category')
        return res.status(200).json(size)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить размер'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedSize = await SizeModel.remove({ _id: id })
      if (deletedSize.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить размер'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new SizeController()