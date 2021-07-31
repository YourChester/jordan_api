const SoldModel = require('../model/SoldModel')
const CostsModel = require('../model/CostsModel')

function isMonday(date) {
 return new Date(date).getDay() === 1
}

function getMonday(date) {
  const localDate = new Date(date)
  return new Date(localDate.setDate(localDate.getDate() - (localDate.getDay() - 1)))
}

class StatisticController {
  async getStatistic(req, res) {
    try {
      const solds = await SoldModel.find({ date: { $ne: null } }).sort({date: 1})

      const startDate = isMonday(solds[0].date) ? solds[0].date : getMonday(solds[0].date)
      let nextMonday = ''
      let haveSold = true
      const statistic = []
      do {
        const firstDate = nextMonday || startDate
        const seconsDate = new Date(new Date(firstDate).setDate(firstDate.getDate() + 6))
        const sold = solds.filter(el => new Date(firstDate).getTime() < new Date(el.date).getTime() 
          && new Date(el.date).getTime() < new Date(seconsDate).getTime())
        if (!sold.length) {
          haveSold = false
        } else {
          statistic.unshift({
            staartDate: firstDate,
            endDate: seconsDate,
            sold,
            visible: false
          })
          nextMonday = new Date(new Date(seconsDate).setDate(seconsDate.getDate() + 1))
        }
      } while(haveSold)

      return res.status(200).json({ 
        statistic,
        solds
      })
    } catch(e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }

  async getStatisticMonth(req, res) {
    try {
      const solds = await SoldModel.find({ date: { $ne: null } }).sort({date: 1})
      const costs = await CostsModel.find()

      const startDate = new Date(new Date(solds[0].date).setDate(1))
      let nextMonday = ''
      let haveSold = true
      const statistic = []
      do {
        const firstDate = nextMonday || startDate
        const seconsDate = new Date(new Date(new Date(firstDate).setMonth(firstDate.getMonth() + 1)).setDate(-2))
        const sold = solds.filter(el => new Date(firstDate).getTime() < new Date(el.date).getTime() 
          && new Date(el.date).getTime() < new Date(seconsDate).getTime())
        const cost = costs.filter(el => new Date(firstDate).getTime() < new Date(el.date).getTime() 
          && new Date(el.date).getTime() < new Date(seconsDate).getTime())
        if (!sold.length) {
          haveSold = false
        } else {
          statistic.unshift({
            year: firstDate.getFullYear(),
            monthId: firstDate.getMonth(),
            sold,
            cost
          })
          nextMonday = new Date(new Date(firstDate).setMonth(firstDate.getMonth() + 1))
        }
      } while(haveSold)

      return res.status(200).json({ 
        monthStatistic: statistic
      })
    } catch(e) {
      console.log(e);
      res.status(500).json({ message: e.message })
    }
  }
}

module.exports = new StatisticController()