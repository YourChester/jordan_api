const mongoose = require('mongoose')

const SoldSchema = mongoose.Schema({
  seller: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SellerModel'
  }],
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscountCardModel'
  },
  discount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: String,
  },
  totalIncome: {
    type: String,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel'
  }],
  comment: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('SoldModel', SoldSchema)