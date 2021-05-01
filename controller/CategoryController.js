const CategoryModel = require('../model/CategoryModel')

class CategoryController {
  async index(req, res) {
    try {
      const categories = await CategoryModel.find().populate('parent')
      return res.status(200).json({ categories })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminIndex(req, res) {
    try {
      const categories = await CategoryModel.find().populate('parent')
      return res.status(200).json({ categories })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { name, parent } = req.body
      const newCategory = new CategoryModel({name, parent})
      await newCategory.save()
      if (newCategory !== null) {
        return res.status(200).json(newCategory)
      } else {
        return res.status(500).json({ message: 'Не удалось создать категорию'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const category = await CategoryModel.findById(id)
      if (category !== null) {
        return res.status(200).json(category)
      } else {
        return res.status(500).json({ message: 'Категория не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const { name, parent } = req.body
      const updatedCategory = await CategoryModel.updateOne({ _id: id }, { $set: { name, parent } })
      if (updatedCategory.nModified) {
        const category = await CategoryController.findById(id)
        return res.status(200).json(category)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить категорию'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedCategory = await CategoryModel.remove({ _id: id })
      if (deletedCategory.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить категорию'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new CategoryController()