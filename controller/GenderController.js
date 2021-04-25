const GenderModel = require('../model/GenderModel')

class GenderController {
  async index(req, res) {
    try {
      const genders = await GenderModel.find()
      return res.status(200).json({ genders })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body
      const newGender = new GenderModel({ name })
      await newGender.save()
      if (newGender !== null) {
        return res.status(200).json(newGender)
      } else {
        return res.status(500).json({ message: 'Не удалось создать пол'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id
      const gender = GenderModel.findById(id)
      if (gender !== null) {
        return res.status(200).json(gender)
      } else {
        return res.status(500).json({ message: 'Пол не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const { name } = req.body
      const updatedGender = await GenderModel.updateOne({ _id: id }, { $set: { name } })
      if (updatedGender.nModified) {
        const gender = await GenderModel.findById(id)
        return res.status(200).json(gender)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить пол'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id
      const deletedGender = await GenderModel.remove({ _id: id })
      if (deletedGender.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить пол'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new GenderController()