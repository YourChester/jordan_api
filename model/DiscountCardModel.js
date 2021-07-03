const mongoose = require('mongoose')

const discountCardSchema = mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  birthday: {
    type: String,
    default: ''
  },
  discount: {
    type: Number,
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