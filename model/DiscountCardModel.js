const mongoose = require('mongoose')

const discountCardSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  visibility: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('DiscountCardModel', discountCardSchema)