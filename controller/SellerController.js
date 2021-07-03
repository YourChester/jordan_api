const bcrypt = require('bcryptjs');

const SellerModel = require('../model/SellerModel')

class SellerController {
  async adminIndex(req, res) {
    try {
      const sellers = await SellerModel.find({ visibility: true }).select('login').select('name').select('login').select('role')
      return res.status(200).json({ sellers })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { name, login, password, role } = req.body

      const sellerCondidate = await SellerModel.findOne({ login })
      if (sellerCondidate) {
        return res.status(400).json({ message: "Продавец с таким логином уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_HASH))

      const newSeller = new SellerModel({name, login, password: hashPassword, role})
      await newSeller.save()
      if (newSeller !== null) {
        return res.status(200).json(newSeller)
      } else {
        return res.status(500).json({ message: 'Не удалось создать продавца'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const seller = await SellerModel.findById(id).populate('role').select('login').select('name')
      if (seller !== null) {
        return res.status(200).json(role)
      } else {
        return res.status(500).json({ message: 'Продавец не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const { name, login, password, role } = req.body

      const hashPassword = bcrypt.hashSync(body.password, Number(process.env.SALT_HASH))

      const updatedSeller = await SellerModel.updateOne({ _id: id }, { $set: { name, login, password: hashPassword, role } })
      if (updatedSeller.nModified) {
        const seller = await SellerModel.findById(id).populate('role').select('login').select('name')
        return res.status(200).json(seller)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить продавца'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedSeller = await SellerModel.remove({ _id: id })
      if (deletedSeller.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить продавца'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new SellerController()