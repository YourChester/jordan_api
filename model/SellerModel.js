const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RoleModel'
  },
  visibility: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('SellerModel', staffSchema)