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
  size: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SizeModel'
  },
  brand: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'BrandModel'
  }],
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
    required: true
  },
  pair: {
    type: mongoose.Schema.Types.ObjectId,
    default: '',
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