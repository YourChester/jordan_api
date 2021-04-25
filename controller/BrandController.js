const BrandModel = require('../model/BrandModel')

class BrandController {
  async index(req, res) {
    try {
      const brands = await BrandModel.find()
      return res.status(200).json({ brands })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async create(req, res) {
    try {
      const { name, visibility } = req.body
      const newBrand = new BrandModel({name, visibility})
      await newBrand.save()
      if (newBrand !== null) {
        return res.status(200).json(newBrand)
      } else {
        return res.status(500).json({ message: 'Не удалось создать бренд'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id
      const brand = await BrandModel.findById(id)
      if (brand !== null) {
        return res.status(200).json(brand)
      } else {
        return res.status(500).json({ message: 'Бренд не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const { name, visibility } = req.body
      const updatedBrand = await BrandModel.updateOne({ _id: id }, { $set: { name, visibility } })
      if (updatedBrand.nModified) {
        const brand = await BrandModel.findById(id)
        return res.status(200).json(brand)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить бренд'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id
      const deletedBrand = await BrandModel.remove({ _id: id })
      if (deletedBrand.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить бренд'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new BrandController()