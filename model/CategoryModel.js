const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: '',
    ref: 'CategoryModel'
  }
})

module.exports = mongoose.model('CategoryModel', categorySchema)