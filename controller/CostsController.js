const CostsModel = require('../model/CostsModel')

class CostsContrioller {
  async adminIndex(req, res) {
    try {
      const page = req.query.page
      const limit = Number(req.query.limit) || 12
      const offSet = limit * page - limit


      const costs = await CostsModel.find()
        .sort({'date': -1})
        .skip(offSet)
        .limit(limit)

      const totalCosts = await CostsModel.countDocuments()
      
      return res.status(200).json({ costs, totalCount: totalCosts, totalPages: Math.ceil(totalCosts / limit) })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminCreate(req, res) {
    try {
      const body = req.body

      const newCost = new CostsModel(body)
      await newCost.save()
      if (newCost !== null) {
        return res.status(200).json({ newCost })
      } else {
        return res.status(500).json({ message: 'Не удалось создать расход'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminShow(req, res) {
    try {
      const id = req.params.id
      const cost = await CostsModel.findById(id)

      if (cost !== null) {
        return res.status(200).json({ cost: cost })
      } else {
        return res.status(500).json({ message: 'Расход не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminUpdate(req, res) {
    try {
      const id = req.params.id
      const updateCost = req.body

      const updatedCost = await CostsModel.updateOne(
        { _id: id }, 
        { $set: updateCost }
      )
      if (updatedCost.modifiedCount) {
        const cost = await CostsModel.findById(id)
        return res.status(200).json({ cost })
      } else {
        return res.status(500).json({ message: 'Не удалось обновить расход'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async adminDelete(req, res) {
    try {
      const id = req.params.id
      const cost = await CostsModel.findById(id)
      if (cost) {
        const deletedCost = await CostsModel.remove({ _id: id })
  
        if (deletedCost.deletedCount !== 0) {
          return res.status(200).json({ message: 'Расход удален'})
        } else {
          return res.status(500).json({ message: 'Не удалось удалить расход'})
        }
      } else {
        return res.status(500).json({ message: 'Расход не найден'})
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new CostsContrioller()