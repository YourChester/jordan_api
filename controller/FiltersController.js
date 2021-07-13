const { ObjectId } = require('mongodb')

const ProductModel = require('../model/ProductModel')
const CategoryModel = require('../model/CategoryModel')

class FiltersController {
  async getFilterSize(req, res) {
    try {
      const payload = {
        visibility: true
      }

      if (req.query.gender && req.query.gender !== 'all') {
        payload.gender = ObjectId(req.query.gender)
      }
      if (req.query.category) {
        const category = await CategoryModel.findById(req.query.category)
        if (!category.parent) {
          const categorys = await CategoryModel.find({ parent: ObjectId(category._id) })
          payload.category = { $in: [] }
          categorys.forEach(el => {
            payload.category.$in.push(ObjectId(el._id))
          })
        } else {
          payload.category = ObjectId(category._id)
        }
      }
      const sizeFilters = await ProductModel.aggregate([
        { $match: { ...payload } },
        { $group: { _id: "$size" } },
      ])
      const re = new RegExp(/[А-Яа-яA-Za-z]/)
      sizeFilters.sort((first, next) => {
        if (re.test(first._id) && re.test(next._id)) {
          if (Number(first._id.slice(0, -1)) == Number(next._id.slice(0, -1))) {
            return 0
          } else if (Number(first._id.slice(0, -1)) > Number(next._id.slice(0, -1))) {
            return 1
          } else {
            return -1
          }
        } else if (!re.test(first._id) && re.test(next._id)) {
          if (Number(first._id) == Number(next._id.slice(0, -1))) {
            return 1
          } else if (Number(first._id) > Number(next._id.slice(0, -1))) {
            return 1
          } else {
            return -1
          }
        } else if (re.test(first._id) && !re.test(next._id)) {
          if (Number(first._id.slice(0, -1)) == Number(next._id)) {
            return -1
          } else if (Number(first._id.slice(0, -1)) > Number(next._id)) {
            return 1
          } else {
            return -1
          }
        } else if (!re.test(first._id) && !re.test(next._id)) {
          return Number(first._id) > Number(next._id) ? 1 : -1
        } else {
          return 0
        }
      })
      return res.status(200).json({ sizes: sizeFilters.map(el => el._id) })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getFilterBrand(req, res) {
    try {
      const payload = {
        visibility: true
      }

      if (req.query.gender && req.query.gender !== 'all') {
        payload.gender = ObjectId(req.query.gender)
      }
      if (req.query.category) {
        const category = await CategoryModel.findById(req.query.category)
        if (!category.parent) {
          const categorys = await CategoryModel.find({ parent: ObjectId(category._id) })
          payload.category = { $in: [] }
          categorys.forEach(el => {
            payload.category.$in.push(ObjectId(el._id))
          })
        } else {
          payload.category = ObjectId(category._id)
        }
      }
      const brandsFilters = await ProductModel.aggregate([
        { $match: { ...payload } },
        { $group: { _id: "$brand" } },
      ])
      brandsFilters.map(el => {
        return el._id
      })
      return res.status(200).json({ brands: brandsFilters.map(el => el._id).sort() })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new FiltersController()