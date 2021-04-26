const mongoose = require('mongoose')

const test = mongoose.Schema({
  articul: {
    type: String
  },
})
module.exports = mongoose.model('Test', test)