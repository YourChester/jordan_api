const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GenderModel'
  }],
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
    type: String
  },
  codeProduct: {
    type: String
  },
  articul: {
    type: String,
  },
  pair: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel'
  },
  priceIn: {
    type: Number
  },
  priceOut: {
    type: Number
  },
  priseSold: {
    type: Number
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
  notPair: {
    type: Boolean,
    default: false
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