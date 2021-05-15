const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'GenderModel'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CategoryModel'
  },
  size: {
    type: String,
  },
  brand: {
    type: String,
  },
  provider: {
    type: String,
    default: ''
  },
  codeBox: {
    type: Number,
    required: true
  },
  codeProduct: {
    type: Number,
    default: 0
  },
  articul: {
    type: String,
  },
  pair: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel'
  },
  priceIn: {
    type: Number,
    required: true
  },
  priceOut: {
    type: Number,
    required: true
  },
  priseSold: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  canUseDiscount: {
    type: Boolean,
    default: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SellerModel'
  },
  comment: {
    type: String,
  },
  dateIn: {
    type: Date,
    default: Date.now
  },
  dateOut: {
    type: Date
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  visibility: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('ProductModel', productSchema)