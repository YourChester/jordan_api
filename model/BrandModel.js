const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  visibility: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('BrandModel', brandSchema)