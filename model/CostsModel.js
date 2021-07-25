const mongoose = require('mongoose')

const costsSchema = mongoose.Schema({
  name: {
    type: String
  },
  sum: {
    type: Number
  },
  date: {
    type: Date
  },
  comment: {
    type: String
  }
})

module.exports = mongoose.model('CostsModel', costsSchema)