const bcrypt = require('bcryptjs');

const UserModel = require('../model/UserModel')

class UserController {
  async adminIndex(req, res) {
    try {
      const users = await UserModel.find().populate('discountCard').populate('gender').select('password')
      return res.status(200).json({ users })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { firstName, lastName, middleName, gender, email, password, address, phone, birthday, discountCard, visibility } = req.body

      const userCondidate = await UserModel.findOne({ email })
      if (userCondidate) {
        return res.status(400).json({ message: "Пользователь с такой почтой уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_HASH))

      const newUser = new UserModel(
        {firstName, lastName, middleName, gender, email, password: hashPassword, address, phone, birthday, discountCard, visibility}
      )
      await newUser.save()
      if (newUser !== null) {
        return res.status(200).json(newUser)
      } else {
        return res.status(500).json({ message: 'Не удалось создать пользователя'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async create(req, res) {
    try {
      const { firstName, lastName, middleName, gender, email, password, address, phone, birthday, discountCard, visibility } = req.body

      const userCondidate = await UserModel.findOne({ email })
      if (userCondidate) {
        return res.status(400).json({ message: "Пользователь с такой почтой уже существует" })
      }

      const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_HASH))

      const newUser = new UserModel(
        {firstName, lastName, middleName, gender, email, password: hashPassword, address, phone, birthday, discountCard, visibility}
      )
      await newUser.save()
      if (newUser !== null) {
        return res.status(200).json(newUser)
      } else {
        return res.status(500).json({ message: 'Не удалось создать пользователя'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const user = await UserModel.findById(id).populate('discountCard').populate('gender').select('password')
      if (user !== null) {
        return res.status(200).json(user)
      } else {
        return res.status(500).json({ message: 'Пользователь не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id
      const user = await UserModel.findById(id).populate('discountCard').populate('gender').select('password')
      if (user !== null) {
        return res.status(200).json(user)
      } else {
        return res.status(500).json({ message: 'Пользователь не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const { firstName, lastName, middleName, gender, email, address, phone, birthday, discountCard, visibility } = req.body
      const updatedUser = await UserModel.updateOne(
        { _id: id },
        { $set: { firstName, lastName, middleName, gender, email, password, address, phone, birthday, discountCard, visibility } }
      )
      if (updatedUser.nModified) {
        const user = await UserModel.findById(id).populate('discountCard').populate('gender').select('password')
        return res.status(200).json(user)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить пользователя'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedUser = await UserModel.remove({ _id: id })
      if (deletedUser.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить пользователя'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new UserController()