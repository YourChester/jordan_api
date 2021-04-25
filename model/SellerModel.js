const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
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
  }
})

module.exports = mongoose.model('SellerModel', staffSchema)