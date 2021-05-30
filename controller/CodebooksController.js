const CategoryModel = require('../model/CategoryModel')
const GenderModel = require('../model/GenderModel')

class CodebooksController {

  async getMenuTree(req, res) {
    try {
      const genders = await GenderModel.find()
      const categories = await CategoryModel.find().populate('parent')
      const parentCategories = categories.filter(el => !el.parent)
      let menuTree = []
      parentCategories.forEach(parentCategory => {
        const childs = categories.filter(el => el.parent).filter(category => category.parent.name === parentCategory.name)
        menuTree.push({
          _id: parentCategory._id,
          name: parentCategory.name,
          childs
        })
      })
      
      return res.status(200).json({ menu: genders.map(el => {
          return {
            _id: el._id,
            name: el.name, 
            categories: menuTree 
          } 
        })
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getGenders(req, res) {
    try {
      const genders = await GenderModel.find()
      return res.status(200).json({ genders })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.find().populate('parent')
      return res.status(200).json({ categories })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new CodebooksController()