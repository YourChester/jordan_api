const bcrypt = require('bcryptjs');

const SellerModel = require('../model/SellerModel')

class SellerController {
  async adminIndex(req, res) {
    try {
      const sellers = await SellerModel.find().populate('role').select('password')
      return res.status(200).json({ sellers })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { firstName, lastName, middleName, login, password, role } = req.body

      const sellerCondidate = await SellerModel.findOne({ login })
      if (sellerCondidate) {
        return res.status(400).json({ message: "Продавец с таким логином уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_HASH))

      const newSeller = new SellerModel({firstName, lastName, middleName, login, password: hashPassword, role})
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
      const seller = await SellerModel.findById(id).populate('role').select('password')
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
      const { firstName, lastName, middleName, login, password, role } = req.body
      const updatedSeller = await SellerModel.updateOne({ _id: id }, { $set: { firstName, lastName, middleName, login, password, role } })
      if (updatedSeller.nModified) {
        const seller = await SellerModel.findById(id).populate('role').select('password')
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