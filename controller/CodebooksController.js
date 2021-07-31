const { ObjectId } = require('mongodb')
const path = require('path')
const fs = require('fs')

const CategoryModel = require('../model/CategoryModel')
const GenderModel = require('../model/GenderModel')
const ProductModel = require('../model/ProductModel')
const SellerModel = require('../model/SellerModel')

class CodebooksController {
  async buildMenu() {
    // const totalProducts = await ProductModel.countDocuments({...payload})
    try {
      const genders = await GenderModel.find()
      const categories = await CategoryModel.find().populate('parent')
      const parentCategories = categories.filter(el => !el.parent)
      const menu = []

      for (let j = 0; j < genders.length; j++) {
        let menuTree = []

        console.log(genders[j].name);

        for(let x = 0; x < parentCategories.length; x++) {
          const childs = categories.filter(category => category.parent).filter(category => category.parent.name === parentCategories[x].name)

          console.log(parentCategories[x].name);

          for (let i = 0; i < childs.length; i++) {
            const countElement = await ProductModel.countDocuments({
              visibility: true,
              category: ObjectId(childs[i]._id),
              gender: ObjectId(genders[j]._id)
            })
            childs[i].count = countElement
            console.log(childs[i].count, genders[j].name, childs[i].name);
          }

          menuTree.push({
            _id: parentCategories[x]._id,
            name: parentCategories[x].name,
            childs: childs.filter(el => el.count)
          })
        }
        menu.push({
          _id: genders[j]._id,
          name: genders[j].name, 
          categories: menuTree 
        })
      }

      fs.writeFileSync(path.resolve(__dirname, '..', 'menu.json'), JSON.stringify(menu, null, 2))
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getMenuTree(req, res) {
    try {
      const fileData = fs.readFileSync(path.resolve(__dirname, '..', 'menu.json'))
      
      return res.status(200).json({ menu: JSON.parse(fileData)})
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

  async getSizes(req, res) {
    try {
      const sizeFilters = await ProductModel.aggregate([
        { $group: { _id: "$size" } },
        { $sort: { _id: 1 } }
      ])
      return res.status(200).json({ sizes: sizeFilters.map(el => el._id) })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getSellers(req, res) {
    try {
      const sellers = await SellerModel.find({ visibility: true }).select('name').populate('role')
      return res.status(200).json({ sellers })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new CodebooksController()