const mongoose = require('mongoose')

const genderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('GenderModel', genderSchema)