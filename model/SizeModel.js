const mongoose = require('mongoose')

const sizeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'GenderModel'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CategoryModel'
  }
})

module.exports = mongoose.model('SizeModel', sizeSchema)