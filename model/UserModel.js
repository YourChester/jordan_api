const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'GenderModel'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date,
    required: true
  },
  discountCard: {
    type: mongoose.Schema.Types.ObjectId,
    default: '',
    ref: 'DiscountCardModel'
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

module.exports = mongoose.model('UserModel', userSchema)