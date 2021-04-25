const mongoose = require('mongoose')

const test = mongoose.Schema({
  name: {
    type: String
  },
  articul: {
    type: String
  },
  show: {
    type: Boolean
  }
})
module.exports = mongoose.model('Test', test)