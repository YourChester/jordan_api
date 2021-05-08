const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SellerModel = require('../model/SellerModel')
const RoleModel = require('../model/RoleModel')

generateUserToken = ( id, role) => {
  const payload = {
    id,
    role,
  }
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "12h"})
}

class AuthController {
  async login(req, res) {
    try {
      const { login, password } = req.body
      const seller = await SellerModel.findOne({ login })
      if (!seller) {
        return res.status(400).json({ message: `Продавец ${login} не найден` })
      }

      const validPassword = bcrypt.compareSync(password, seller.password)
      if(!validPassword) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const role = await RoleModel.findOne({ _id: seller.role })
      const token = generateUserToken(seller._id, role.key)
      return res.status(200).json({ token })
    }catch (e) {
      console.log(e.message)
      res.status(400).json({ message: "Авторизация не удалась"})
    }
  }

  async logout(req, res) {
    try {
      return res.status(200).json({ seller: {}, token: '' })
    }catch (e) {
      onsole.log(e.message)
    }
  }

  async getUserInfo(req, res) {
    try {
      const { id } = req.seller
      const seller = await SellerModel.findOne({ _id: id })
        .populate('role')
        .select('login')
        .select('firstName')
        .select('lastName')
        .select('middleName')
      if (!seller) {
        return res.status(400).json({ message: "Продавец не найден" })
      }

      return res.status(200).json({seller})
    }catch (e) {
      console.log(e.message)
      res.status(400).json({ message: "Продавец не опознан"})
    }
  }
}

module.exports = new AuthController()