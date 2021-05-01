const RoleModel = require('../model/RoleModel')

class RoleController {
  async adminIndex(req, res) {
    try {
      const rules = await RoleModel.find()
      return res.status(200).json({ rules })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const { name, key } = req.body
      const newRule = new RoleModel({name, key})
      await newRule.save()
      if (newRule !== null) {
        return res.status(200).json(newRule)
      } else {
        return res.status(500).json({ message: 'Не удалось создать роль'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const role = await RoleModel.findById(id)
      if (role !== null) {
        return res.status(200).json(role)
      } else {
        return res.status(500).json({ message: 'Роль не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const { name, key } = req.body
      const updatedRole = await RoleModel.updateOne({ _id: id }, { $set: { name, key } })
      if (updatedRole.nModified) {
        const role = await RoleModel.findById(id)
        return res.status(200).json(role)
      } else {
        return res.status(500).json({ message: 'Не удалось обновить роль'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const deletedRole = await RoleModel.remove({ _id: id })
      if (deletedRole.deletedCount !== 0) {
        return res.status(200)
      } else {
        return res.status(500).json({ message: 'Не удалось удалить роль'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new RoleController()